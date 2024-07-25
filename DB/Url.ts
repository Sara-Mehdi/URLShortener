import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('shortened_urls', { schema: 'public' })
export class ShortenedUrls extends BaseEntity{
    @PrimaryGeneratedColumn({type: 'integer', name: 'id'})
    id?: number

    @Column({type: 'character varying', name: 'long_url'})
    longUrl?: string

    @Column({type: 'character varying', name: 'short_url'})
    shortUrl?: string

    @Column({ type: 'integer', name: 'nb_clicks', default: 0})
    nbClicks?: number

    toShare() {
        return {
            originalUrl: this.longUrl,
            shortUrl: this.shortUrl,
            nbClicks: this.nbClicks
        }
    }
}