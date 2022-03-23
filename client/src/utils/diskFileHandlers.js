import {
    dirname
} from 'path'
import {
    fileURLToPath
} from 'url'
import {
    promises as fs
} from 'fs'
import multer from 'multer'

const __dm = dirname(fileURLToPath(import.meta.url)); //*полный путь к текущей директории
const ROOT_PATH = `${__dm}`;
const notExist = (e) => e.code === 'ENOENT'; //* определение несуществующего файла
const truncPath = (path) => path.split('/').slice(0, -1).join('/'); //* уменьшение пути на единицу


/**
 * %Fuction CreateFile 
 * @param {*} fileData данные 
 * @param {String} filePath путь
 * @param {String} fileExt расширение
 */
export async function createFile(fileData, filePath, fileExt = 'json') {
    const fileName = `${ROOT_PATH}/${filePath}.${fileExt}`;

    try {
        if (fileExt === 'json') {
            await fs.writeFile(fileName, JSON.stringify(fileData, null, 2))
        } else {
            await fs.writeFile(fileName, fileData)
        }

    } catch (err) {
        if (notExist(err)) {
            await fs.mkdir(truncPath(`${ROOT_PATH}/${filePath}`), {
                recursive: true
            })

            return createFile(fileData, filePath, fileExt)
        }
        throw err
    }
}

//%Fuction ReadFile

export async function readFile(filePath, fileExt = 'json') {
    const fileName = `${ROOT_PATH}/${filePath}.${fileExt}`;
    let fileHandler = null;


    try {
        fileHandler = await fs.open(fileName);
        const fileContent = await fileHandler.readFile('utf-8')
        return fileExt === 'json' ? JSON.parse(fileContent) : fileContent
    } catch (error) {
        if (notExist(error)) {
            throw {
                status: 404,
                message: 'Not Found'
            }
        }
        throw error
    } finally {
        fileHandler?.close()

    }
}
//% Function RemoveFile
export async function removeFile(filePath, fileExt = 'json') {
    const fileName = `${ROOT_PATH}/${filePath}.${fileExt}`;

    try {
        await fs.unlink(fileName)
        await removeDir(truncPath(`${ROOT_PATH}/${filePath}`))
    } catch (err) {
        if (notExist(err)) {
            throw {
                status: 404,
                message: 'Not Found'
            }
        }
        throw err
    }
}

//% Function RemoveDirectory
async function removeDir(dirPath, rootPath = ROOT_PATH) {
    if (dirPath === rootPath) return
    const isEmpty = (await fs.readdir(dirPath)).length < 1

    if (isEmpty) {
        await fs.rmdir(dirPath)
        removeDir(truncPath(dirPath), rootPath)
    }
}

//% Function Get File Names
export async function getFileNames(path = ROOT_PATH) {
    let fileNames = [];

    try {
        const files = await fs.readdir(path)
        if (files.length < 1) return fileNames
        for (const file of files) {
            file = `${path}/${file}`;
            const isDir = (await fs.stat(file)).isDirectory();

            if (isDir) {
                fileNames = fileNames.concat(await getFileNames(file))
            } else {
                fileNames.push(file)
            }
        }
        return fileNames
    } catch (err) {
        if (notExist(err)) {
            throw {
                status: 404,
                message: 'Not Found'
            }
        }
        throw err
    }
}

export const uploadFile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            //* важно: последняя часть названия проекта должна совпадать с названием файла
            //* например, если проект называется `data/todos`, то файл должен называться `todos.json`
            //* мы также удаляем расширение файла из пути к директории
            const dirPath = `${ROOT_PATH}/${req.body.project_name.replace(
                file.originalname.replace('.json', ""), ''
            )}`
            //* здесь мы исходим из предположения, что директория для файла отсутствует
            //* с существующей директорией ничего не случится
            fs.mkdir(dirPath, {
                recursive: true
            }).then(() => {
                cb(null, dirPath)
            })
        },
        filename: (_, file, cb) => {
            cb(null, file.originalname)
        }
    })
})
export function isJson(item) {
    try {
        item = JSON.parse(item)
    } catch (e) {
        return false
    }

    if (typeof item === 'object' && item !== null) {
        return true
    }

    return false
}