import { Router, Request, Response } from 'express'
import shortenUrlController from "./controller"
import * as validator from "validator"

const router = Router()

router.post('/api/shortUrl', async (req: Request, res: Response) => {
    const { longUrl } = req.body
    try {
        if (!validator.isURL(longUrl))
            return res.status(400).json('Error: The url is not valid')

        const shortUrl = await shortenUrlController.createShortUrl(longUrl)
        res.status(201).json({ originalUrl: longUrl, shortUrl })
    } catch (error) {
        console.error('Server Error in create short url', error)
        res.status(500).json({ message: 'Server Error in create short url'})
    }
})

router.get('/api/shortUrl/:shortUrl', async (req: Request, res: Response) => {
    const { shortUrl } = req.params
    try {
        const urlEntity = await shortenUrlController.getUrl(shortUrl)
        if(!urlEntity)
            return res.status(400).send('Error: No URL matching the given short URL')

        if(urlEntity.longUrl)
            return res.redirect(urlEntity.longUrl)
        res.status(204)
    } catch (error) {
        console.error('Server Error in getting URL', error)
        res.status(500).json({ message: 'Server Error in getting URL' })
    }
})

router.get('/api/shortUrls/analytics', async (req: Request, res: Response) => {
    try {
       const analytics = await shortenUrlController.getAnalytics()
        res.status(200).send(analytics)
    } catch (error) {
        console.error('Server Error in getting analytics', error)
        res.status(500).json({ message: 'Server Error in getting analytics' })
    }
})

export default router
