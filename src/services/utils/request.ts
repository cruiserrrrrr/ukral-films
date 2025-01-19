export const request = async (url: string, options?: any): Promise<any> => {
	await fetch(`https://kp.kinobox.tv/films${url}`, {
		method: "GET",
		...options
	})
		.then((res) => {
			if (res.ok) {
				return res.json()
			}
		})
		.catch((err) => {
			console.log(err)
		})
}