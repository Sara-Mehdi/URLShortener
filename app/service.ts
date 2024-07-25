import { ShortenedUrls } from "../DB/Url"
import crypto from 'crypto'
import DB from "../DB/conf";

class ShortenUrls {
     async create(longUrl: string) {
         const shortUrl = crypto.randomBytes(8).toString('base64').slice(0, 8)
         const repository = DB.getRepository(ShortenedUrls)
         const url = await repository.findOne({ where: { longUrl }})
         const shortened = repository.create()
         shortened.shortUrl = shortUrl
         shortened.longUrl = longUrl
         if(url)
             shortened.id = url.id

         return repository.save(shortened)
    }

    async get(shortUrl: string): Promise<ShortenedUrls | null> {
        const repository = DB.getRepository(ShortenedUrls)
        return repository.findOne({ where: { shortUrl }})
    }

    clickedUrl(id: number, nbClicks: number) {
        const repository = DB.getRepository(ShortenedUrls)
        return repository.update({ id }, { nbClicks: nbClicks + 1 })
    }

    analytics() {
        const repository = DB.getRepository(ShortenedUrls)
        return repository.find()
    }

}

const shortenUrlService = new ShortenUrls()
export default shortenUrlService