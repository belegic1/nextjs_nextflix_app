import videoData from "../data/videos.json"

const fetchVideos = async (url) => {
    const baseUrl = "https://youtube.googleapis.com/youtube/v3"
    const response = await fetch(`${baseUrl}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`)
    return response.json()
}

export const getCommonVideos = async (url) => {

    try {
        
        const data = process.env.DEVELOPMENT  === true ? videoData : await fetchVideos(url)
       if (data?.error) {
            console.error(data.error);
            return []
        }


       return data?.items.map((item, i) => {
           const id = item.id?.videoID || item.id
           return {
               id: id,
               title: item.snippet.title,
               imgUrl: item.snippet.thumbnails.high.url,
               description: item.snippet.description,
               publishTime: item.snippet.publishedAt,
               channelTitle: item.snippet.channelTitle,
               statistics: item.statistics? item.statistics: {viewCount: 0}
           }
       })
   } catch (error) {
       console.error(error.message)
       return []
   }
}

export const getVideos = async (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}`
    return getCommonVideos(URL)
}

export const getPopularVideos = async () => {
    const URL =`videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`
    return getCommonVideos(URL)
}


export const getYoutubeVideoById = async (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
    return getCommonVideos(URL)
}

export function getAllVideos() {
    return videoData?.items.map((item) => {
        const id = item.id?.videoID || item.id
        return {
            id: id,
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            description: item.snippet.description,
            publishTime: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
            statistics: item.statistics ? item.statistics : { viewCount: 0 }
        }
    })
}


export function getRequestedVideo(videoId) {
    return getAllVideos().find(video => { return video.id.videoId === videoId })
}
