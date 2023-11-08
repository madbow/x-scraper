export default (results, website) => {
    const body = () => {
        if (website === 'tokopedia') {
            return (
                results.map((item) => (
                    `<a class="mb-8 border w-1/6 px-2 py-2" href="${item.link}" target="_blank">
                        <img class="mb-2" src="${item.image}">
                        <h1 class="text-md text-gray-800 mb-2">${item.name}</h1>
                        ${item.discount !== '0%' ? `<div class="text-sm text-red-500 mb-2 bg-red-100 w-1/6">${item.discount}</div> <h2 class="text-sm text-red-500 mb-2 line-through">${item.discountPrice}</h2>` : ''}
                        <p class="text-sm font-bold text-blue-500 mb-2">${item.price}</p>
                        <p class="text-sm mb-2">🏙️${item.city}</p>
                        <p class="text-sm mb-2">🏬${item.store}</p>
                        <p class="text-sm">⭐️⭐️⭐️⭐️⭐️ (${item.review})</p>
                    </a>`
                )).join('')
            )
        } else {
            return (
                results.map((item) => (
                    `<a class="mb-8 border w-1/6 px-2 py-2" href="${item.link}" target="_blank">
                        <img class="mb-2" src="${item.image}" alt="${item.name}" />
                        <h1 class="text-md text-gray-800 mb-2">${item.name}</h1>
                        ${item.discount ? `<div class="text-sm text-red-500 mb-2 bg-red-100 w-1/6">${item.discount}</div> <h2 class="text-sm text-red-500 mb-2 line-through">${item.discountPrice}</h2>` : ''}
                        <p class="text-sm font-bold text-blue-500 mb-2">${item.price}</p>
                        ${item?.label ? `<p class="text-sm mb-2">🚨 ${item?.label || ''}</p>` : ''}
                        ${item.rating ? `<p class="text-sm">⭐️ ${item.rating} | ${item.review} (ulasan)</p>` : ''}
                    </a>`
                )).join('')
            )
        }
    }
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>${website?.toUpperCase()}</title>
    </head>
    <body class="px-10 py-10">
        <div class="flex flex-wrap gap-4 justify-center">
            ${body()}
        </div>
    </body>
    `

    return html
}