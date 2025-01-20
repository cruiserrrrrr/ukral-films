const URL = "https://kp.kinobox.tv/films"

export const request = async (url: string, options?: any): Promise<any> => {
	console.log(URL + url, 'URL + url')
	return await fetch(URL + url, {
		method: "GET",
		...options,
		next: {
			revalidate: 60 * 60 * 10,
		}
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((err) => {
			console.log(err)
			return {
				statusCode: 500,
			}
		})
}