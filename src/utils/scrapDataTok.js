import * as cheerio from 'cheerio';
export default async (body) => {
    console.log('disini')
    try {
        let $ = cheerio.load(body)

        const product = $('.css-bk6tzz > .css-54k5sq').map((_, el) => {
            const link = $(el).attr('href')

            if (/\b\w*ta\.tokopedia\.com\w*\b/g.test(link)) return null
    
            const name = $(el).children('.css-16vw0vn').children('.css-11s9vse').children('.css-20kt3o').text().trim()
    
            const discount = $(el).children('.css-16vw0vn').children('.css-11s9vse').children('div').children('.css-1nl8cnn').text().trim() || null
            const [discountPercent, discountPrice] = discount?.split('%') ?? ['0', '0']
    
            const price = $(el).children('.css-16vw0vn').children('.css-11s9vse').children('div').children('.css-pp6b3e').children('span').text().trim()
            let city, store
            $(el).children('.css-16vw0vn').children('.css-11s9vse').children('.css-tpww51').children('.css-vbihp9').children('span').each((i, el) => {
                switch (i) {
                    case 0:
                        city = $(el).text().trim()
                        break;
                
                    default:
                        store = $(el).text().trim()
                        break;
                }
            })
            let review = $(el).children('.css-16vw0vn').children('.css-11s9vse').children('.css-1riykrk').children('div').children('span').text().trim()
            review = /\((.*?)\)/.exec(review)
            review = review?.[1] || null
            const image = $(el).children('.css-16vw0vn').children('.css-79elbk').children('.css-377m5r').children('.css-1g5og91').find('img').attr('src') ?? null
            
            return {
                name,
                discount: discountPercent + '%',
                discountPrice: discountPrice === '0' ? 'Rp0' : discountPrice,
                price,
                city,
                store,
                review,
                image,
                link
            }
        }).get()

        return product
    } catch (error) {
        return []
    }
}