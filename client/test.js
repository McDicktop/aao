// const obj = { name: 'John', age: 30 };
// const { age, ...newObj } = obj;
// console.log(newObj);

// const title = { en: 'En', es: 'Es', ru: 'Ru', _id: '7475476543' };
// const { _id, ...newObj2 } = title
// console.log(newObj2)



// АВТОРИЗАЦИЯ
// ФОРМА АВТОРИЗАЦИИ
// МАРШРУТИЗАЦИЯ

// КАСТОМНЫЙ СКРОЛЛ, ДОРАБОТАТЬ ДИЗАЙН

// КЛИЕНТСКИЙ САЙТ

// РАЗВЕРНУТЬ САЙТ

const array = [
  {
    title: {
      en: "TitleEnglish",
      es: "TitleSpanish",
      ru: "TitleRuss test ian",
    },
    description: {
      en: "TitleEnglish",
      es: "TitleSpanish",
      ru: "TitleRussian",
    },
    size: {
      width: 12,
      height: 14,
    },
  },
  {
    title: {
      en: "dfgdfg",
      es: "ghg",
      ru: "fdgdfgdfgdfg fdsfg ",
    },
    description: {
      en: "TitleEnglish",
      es: "TitleSpanish",
      ru: "TitleRussian",
    },
    size: {
      width: 12,
      height: 14,
    },
  },
  {
    title: {
      en: "Englitestsh",
      es: "Spanish",
      ru: "Russian",
    },
    description: {
      en: "TitleEnglitestsh",
      es: "TitleSp testanish",
      ru: "TitleRussian",
    },
    size: {
      width: 12,
      height: 14,
    },
  },
];

const result = array.reduce((prev, current) => {
  for (let item of Object.keys(current.title)) {
    if (current.title[item].includes('test')) {
      prev.push(current)
      return prev;
    }
  }
  return prev
}, [])

console.log(result)
