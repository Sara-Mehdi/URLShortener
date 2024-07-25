import shortenUrlService from "./service"
import { ShortenedUrls } from "../DB/Url"

class ShortUrlController {
    async createShortUrl(url: string) {
        try {
            const result = await shortenUrlService.create(url)
            if (result)
                return result.shortUrl
        } catch (error) {
            console.error('Error in shortening the url', error)
            throw new Error(`Error in shortening the url: ${ error }`)
        }
    }

    async getUrl(shortUrl: string): Promise<ShortenedUrls | null> {
        try {
            const urlEntity = await shortenUrlService.get(shortUrl)
            if(urlEntity)
                await shortenUrlService.clickedUrl(urlEntity.id!, urlEntity.nbClicks!)

            return urlEntity
        } catch (error) {
            console.error('Error in getShortUrl', error)
            throw new Error(`Error in getShortUrl: ${ error }`)
        }
    }

    async getAnalytics() {
        try {
            let urlEntity = await shortenUrlService.analytics()

            if(!urlEntity)
                return []
            return urlEntity?.map(row => row.toShare())
        } catch (error) {
            console.error('Error in get analytics', error)
            throw new Error(`Error in get analytics: ${ error }`)
        }
    }
}

const shortenUrlController = new ShortUrlController()
export default shortenUrlController