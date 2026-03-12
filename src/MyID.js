/**
 * @typedef {string} MyID
 */

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lettersDigits = letters + '0123456789'

const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)]

const generateID = () =>
    getRandomChar(letters) +
    Array.from({ length: 21 }, () => getRandomChar(lettersDigits)).join('')

const validateID = (id) => {
    if (!/^[a-zA-Z][a-zA-Z0-9]{21}$/.test(id)) {
        throw new Error(`Не валидный id: ${id}`)
    }
    return id
}

/**
 * MyID — утилита для генерации и валидации идентификаторов фиксированного формата.
 *
 * Формат ID:
 * - длина: 22 символа
 * - первый символ: латинская буква (a–z, A–Z)
 * - остальные 21 символ: латинские буквы или цифры (a–z, A–Z, 0–9)
 *
 * - MyID() → сгенерировать новый ID
 * - MyID(id) → провалидировать переданный ID, выбросить ошибку при несоответствии
 * 
 * @overload
 * Генерирует новый ID
 * @returns {MyID} Новый сгенерированный идентификатор
 *
 * @overload
 * Валидирует существующий ID
 * @param {string} id - Идентификатор для валидации
 * @returns {MyID} Валидный идентификатор
 * @throws {Error} Если ID не соответствует формату
 */
export function MyID(id) {
    return arguments.length === 0 ? generateID() : validateID(id)
}
