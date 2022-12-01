class FileService {

	saveFile(file) {
		return { url: `/upload/${file.originalname}` }
	}
}
export default new FileService() 