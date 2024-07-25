import { ShortenedUrls } from "../DB/Url"
import crypto from 'crypto'

class ShortenUrls {
     async create(longUrl: string) {
        const shortUrl = crypto.randomBytes(8).toString('base64').slice(0, 8)

         const url = await ShortenedUrls.findOne({ where: { longUrl }})
         const shortened = ShortenedUrls.create()
         shortened.shortUrl = shortUrl
         shortened.longUrl = longUrl
         if(url)
             shortened.id = url.id

         return ShortenedUrls.save(shortened)
    }

    async get(shortUrl: string): Promise<ShortenedUrls | null> {
        let url
        url = await ShortenedUrls.findOne({ where: { shortUrl }})
        return url
    }

    clickedUrl(id: number, nbClicks: number) {
        return ShortenedUrls.update({ id }, { nbClicks: nbClicks + 1 })
    }

    analytics() {
         return ShortenedUrls.find()
    }

}

const shortenUrlService = new ShortenUrls()
export default shortenUrlService