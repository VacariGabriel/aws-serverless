'use strict';
const { get } = require('axios')

class Handler {
  constructor({ rekoSvc, translatorSvc }) {
    this.rekoSvc = rekoSvc
    this.translatorSvc = translatorSvc
  }

  async main(event) {
    try {
      const { imageUrl } = event.queryStringParameters

      console.log('Downloading image...')
      const buffer = await this.getImageBuffer(imageUrl)

      console.log('Detecting Labels...')
      const { names, workingItems } =  await this.detectImageLabels(buffer)

      console.log('Translating to Portuguese')
      const texts = await this.translateText(names)

      console.log('Handling final object')
      const finalTexts = this.formatTextResults(texts, workingItems)

      console.log('Finishing')
      return {
        statusCode: 200,
        body: `A imagem tem\n `.concat(finalTexts)
      }
      
    } catch (error) {
        console.log(error)
        return {
          statusCode: 500,
          body: 'Internal server error!'
        }
    }
  }

  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: 'arraybuffer'
    })

    const buffer = Buffer.from(response.data, 'base64')

    return buffer
  }

  async detectImageLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise()

    const workingItems = result.Labels.filter(({ Confidence }) => Confidence > 80 )

    const names = workingItems.map(( { Name }) => Name )
      .join(' and ')

    return { names, workingItems }
  }

  async translateText(text) {
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text
    }

    const { TranslatedText } = await this.translatorSvc
                            .translateText(params)
                            .promise()

    return TranslatedText.split(' e ')
  }

  formatTextResults(texts, workingItems) {
    const finalTexts = []

    for(const indexText in texts) {
      const nameInPortuguese = texts[indexText]
      const { Confidence } = workingItems[indexText]
    
      finalTexts.push (
        `${Confidence.toFixed(2)}% de chance de ser ${nameInPortuguese}\n`
      )
    }

    return finalTexts
    
  }
}

//FACTORY
const AWS = require('aws-sdk')
const rekognition = new AWS.Rekognition()
const translator = new AWS.Translate()

const handler = new Handler({
  rekoSvc: rekognition,
  translatorSvc: translator
})

// bind -> ignore all variable except the function scope.
module.exports.main = handler.main.bind(handler)
