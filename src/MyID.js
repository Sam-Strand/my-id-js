/**
 * @typedef {string} MyID
 * @description Уникальный идентификатор фиксированного формата:
 * - длина: 22 символа
 * - первый символ: латинская буква (a–z, A–Z)
 * - остальные 21 символ: латинские буквы или цифры (a–z, A–Z, 0–9)
 *
 * Генерация использует криптостойкий источник случайных чисел (CSPRNG).
 * Детерминированное создание выполняется через SHA-256 от переданной строки.
 */

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lettersDigits = letters + '0123456789'

/**
 * Возвращает случайный символ из переданного набора.
 * Использует криптостойкий генератор `crypto.getRandomValues`.
 *
 * @param {string} chars - Строка с доступными символами
 * @returns {string} Случайный символ из chars
 */
const getRandomChar = (chars) => {
    const rand = new Uint32Array(1)
    crypto.getRandomValues(rand)
    return chars[rand[0] % chars.length]
}

/**
 * Генерирует новый случайный ID.
 *
 * @returns {MyID} Новый идентификатор
 */
const generateID = () =>
    getRandomChar(letters) +
    Array.from({ length: 21 }, () => getRandomChar(lettersDigits)).join('')

/**
 * Проверяет, соответствует ли переданная строка формату MyID.
 *
 * @param {string} id - Проверяемая строка
 * @returns {MyID} Та же строка, если валидна
 * @throws {Error} Если строка не соответствует формату
 */
const validateID = (id) => {
    if (!/^[a-zA-Z][a-zA-Z0-9]{21}$/.test(id)) {
        throw new Error(`Не валидный id: ${id}`)
    }
    return id
}

/**
 * Детерминированно создаёт ID из переданной строки-источника.
 * Для одинакового source всегда возвращает один и тот же ID.
 *
 * @param {string} source - Исходная строка (например, email или username)
 * @returns {Promise<MyID>} Промис с идентификатором
 */
const deriveID = async (source) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(source)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const digest = new Uint8Array(hashBuffer)

    const first = letters[digest[0] % letters.length]
    const rest = Array.from({ length: 21 }, (_, i) => {
        return lettersDigits[digest[i + 1] % lettersDigits.length]
    }).join('')

    return validateID(first + rest)
}

/**
 * MyID — утилита для генерации и валидации идентификаторов фиксированного формата.
 *
 * Формат ID:
 * - длина: 22 символа
 * - первый символ: латинская буква (a–z, A–Z)
 * - остальные 21 символ: латинские буквы или цифры (a–z, A–Z, 0–9)
 *
 * - MyID() → сгенерировать новый криптостойкий случайный ID
 * - MyID(id) → провалидировать переданный ID, выбросить ошибку при несоответствии
 * - MyID.derive(source) → асинхронно получить детерминированный ID из строки source
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

/**
 * Статический метод для детерминированного создания ID.
 *
 * @param {string} source - Исходная строка
 * @returns {Promise<MyID>} Промис с идентификатором
 *
 * @example
 * const id = await MyID.derive('user@example.com')
 */
MyID.derive = deriveID
