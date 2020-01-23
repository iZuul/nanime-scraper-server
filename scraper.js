const fetch = require('node-fetch');
const cheerio = require('cheerio')

const url = "https://nanime.in/?s="
const hostUrl = "https://nanime.in/"
const episodeUrl = "https://nanime.in/episode/"
const pageUrl = "https://nanime.in/"

const searchCache = {}
const animeCache = {}
const episodeCache = {}

function searchAnime(anime_name){
    if(searchCache[anime_name]){
        console.log('Serving search cache...... ', anime_name)
        return Promise.resolve(searchCache[anime_name])
    }

    return fetch(`${url}${anime_name}`)
    .then(res =>  res.text())
    .then(body => {
        const animes = []
        const pages = []

        const $ = cheerio.load(body)
        $('.content-item').each((i , element) => {
            const elem = $(element)
            const title = elem.find('h3').attr('title')
            const img = elem.find('a .poster img')

            const split_img_src = img.attr('src').split('/')
            const idpath = split_img_src[split_img_src.length-1]
            const id = idpath.split('.')[0]

            const link_path = new URL(elem.find('a').attr('href'))
            const type = link_path.pathname.split('/')[1]
            const link_name = link_path.pathname.split('/')[2]

            const anime = {
                id: id,
                title: title,
                image: img.attr('src'),
                watch: link_path.pathname,
                type: type,
                link_name: link_name
            }
           animes.push(anime)
        })

        $('.page-numbers').each((i, element) => {
            const elem = $(element)
            const number = elem.text()
            let page_number
            if(elem.attr('href')){
                const full_link = new URL(elem.attr('href'))
                page_number = full_link.pathname.split('/')[2]
            } else {
                page_number = elem.attr('href')
            }

                
            const page = {
                title_number: number,
                page_number: page_number
            }
            pages.push(page)
        })

        searchCache[anime_name] = {animes, pages}

        return {
            animes,
            pages
        }
    })
}

function getAnime(type, name){
    if(animeCache[type, name]){
        console.log('Serving Anime Cachee........ ', type, name)
        return Promise.resolve(animeCache[type, name])
    }

    return fetch(`${hostUrl}${type}/${name}`)
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body)
        const title_page = $('.content-header h1').text()
        const title = $('.breadcrumb .active').text()
        const img = $('.poster').attr('src')

        const values = []
        const tableValue = $('.table tbody tr td .label').each((i, element) => {
            const value = $(element).text();
            values.push(value)
        })
        const year = values[0]
        const status = values[1]
        const genres = values.slice(2)

        const sinopsis = $('.attachment-text').text()

        if(type == 'anime'){
            const episodes = [] 
            const table_list_episode = $('#table-episode tbody td').each((i, element) => {
                const elem = $(element)
                const link_episode = new URL(elem.children().attr('href'))
                const link = link_episode.pathname.split('/')[2]
                const episode = {
                    title: $(element).text(),
                    link: link
                };
                episodes.push(episode)
            })

            const anime = {
                title_page:title_page,
                title:title,
                image:img,
                year:year,
                status:status,
                genre:genres,
                sinopsis:sinopsis,
                list_episodes:episodes
            }

            animeCache[type, name]
            return anime
        } else {
            const movie_episode = $('.link_server').attr('value')
            const movie = {
                title: title,
                link: movie_episode
            }

            const anime = {
                title_page:title_page,
                title:title,
                image:img,
                year:year,
                status:status,
                genre:genres,
                sinopsis:sinopsis,
                movie: movie
            }

            animeCache[type, name]
            return anime
        }
    })
}

function getEpisode(list_eps){
    if(episodeCache[list_eps]){
        console.log('Serving Anime Cachee........ ', list_eps)
        return Promise.resolve(episodeCache[list_eps])
    }

    return fetch(`${episodeUrl}${list_eps}`)
    .then(res => res.text())
    .then(body => {
        const page_navigation = []

        const $ = cheerio.load(body)
        const title_page = $('.content-header h1').text()
        const title = $('.breadcrumb .active').text()
        const link_video = $('.link_server').attr('value')
        
        
        const page_nav_value = $('.btn-group .btn').each((i, element) => {
            const elem = $(element)
            const icon = elem.find('span').attr('class')
            const link = elem.attr('href')
            
            const page = {
                icon: icon,
                link: link
            }
            page_navigation.push(page)
        })

        console.log("link video", link_video)
        episodeCache[list_eps]

        return detail_episode = {
            title_page: title_page,
            title: title,
            link_video: link_video,
            page_navigation:page_navigation
        }
    })
}

function searchPage(anime_name, number){
    console.log(anime_name, number,)
    return fetch(`${pageUrl}page/${number}?s=${anime_name}`)
    .then(res => res.text())
    .then(body => {
        const animes = []
        const pages = []

        const $ = cheerio.load(body)
        $('.content-item').each((i , element) => {
            const elem = $(element)
            const title = elem.find('h3').attr('title')
            const img = elem.find('a .poster img')

            const split_img_src = img.attr('src').split('/')
            const idpath = split_img_src[split_img_src.length-1]
            const id = idpath.split('.')[0]

            const link_path = new URL(elem.find('a').attr('href'))
            const type = link_path.pathname.split('/')[1]
            const link_name = link_path.pathname.split('/')[2]

            const anime = {
                id: id,
                title: title,
                image: img.attr('src'),
                watch: link_path.pathname,
                type: type,
                link_name: link_name
            }
           animes.push(anime)
        })

        $('.page-numbers').each((i, element) => {
            const elem = $(element)
            const number = elem.text()
            let page_number
            if(elem.attr('href')){
                const full_link = new URL(elem.attr('href'))
                page_number = full_link.pathname.split('/')[2]
            } else {
                page_number = elem.attr('href')
            }
            
            const page = {
                title_number: number,
                page_number: page_number
            }
            pages.push(page)
        })

        return {
            animes,
            pages
        }
    })
}

module.exports = {
    searchAnime,
    getAnime,
    getEpisode,
    searchPage
}