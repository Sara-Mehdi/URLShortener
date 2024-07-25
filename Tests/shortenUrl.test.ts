import shortenUrlService from '../app/service'
import crypto from 'crypto'
import { ShortenedUrls } from "../DB/Url"

jest.mock('crypto')
const mockRandomBytes = crypto.randomBytes as jest.Mock

describe('URLShortener', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should create a new shortened URL', async () => {
        const longUrl = 'https://www.lunii.com'
        const shortUrl = '4hxNeKKJ'

        mockRandomBytes.mockReturnValue(Buffer.from(shortUrl, 'base64'))
        const result = await shortenUrlService.create(longUrl)

        expect(result).toEqual({ id: 1, shortUrl, longUrl, nbClicks: 0 })
        expect(ShortenedUrls.findOne).toHaveBeenCalledWith({ where: { longUrl } })
        expect(ShortenedUrls.create).toHaveBeenCalled()
        expect(ShortenedUrls.save).toHaveBeenCalledWith({ shortUrl, longUrl })
    })

    it('should get a URL by shortUrl', async () => {
        const shortUrl = '4hxNeKKJ'
        const longUrl = 'https://www.lunii.com'
        const url = { shortUrl, longUrl }

        const result = await shortenUrlService.get(shortUrl)

        expect(result).toEqual(url)
        expect(ShortenedUrls.findOne).toHaveBeenCalledWith({ where: { shortUrl } })
    })

    it('should update the number of clicks for a URL', async () => {
        const nbClicks = 2
        const longUrl = 'https://www.lunii.com'

        const created = await shortenUrlService.create(longUrl)
        expect(created).toBe(Object)
        expect(created).toBeInstanceOf(ShortenedUrls)

        await shortenUrlService.clickedUrl(created.id, nbClicks)

        const url = await shortenUrlService.get(created.shortUrl)
        expect(url).toBe(Object)
        expect(url).toBeInstanceOf(ShortenedUrls)

        expect(url.nbClicks).toEqual(3)
        expect(ShortenedUrls.update).toHaveBeenCalledWith({ id }, { nbClicks: nbClicks + 1 })
    })

    it('should get all URLs for analytics', async () => {
        const urls = [
            { originalUrl: '4hxNeKKJ', longUrl: 'https://www.lunii.com', nbClicks: 3 },
        ]

        const result = await shortenUrlService.analytics()

        expect(result).toEqual(urls)
        expect(ShortenedUrls.find).toHaveBeenCalled()
    })
})
