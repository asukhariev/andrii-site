export const FOP_DATA = {
  nameUk: "ФОП Сухарєв Андрій Андрійович",
  nameEn: "PE Andrii Sukhariev",
  fullNameEn: "Andrii Sukhariev",
  ipn: "3358808333",
  addressUk: "м. Кременчук, вул. Тараса Бульби 18, кв. 25",
  addressEn: "18/25 Tarasa Bulby St., Kremenchuk, Ukraine",
  kved: "62.01 — Комп'ютерне програмування",
  taxGroup: "3-тя група, 5%",
  isVAT: false,
  registrationDate: "18.08.2017",
  bank: {
    name: "JSC UKRSIBBANK",
    nameUk: 'АТ «УКРСИББАНК»',
    swift: "KHABUA2K",
    mfo: "351005",
    address: "2/12 Andriivska St., Kyiv, 04070, Ukraine",
    accounts: {
      UAH: "UA663510050000026000878790466",
      EUR: "UA363510050000026001879015042",
      USD: "UA183510050000026002879015041",
    } as Record<string, string>,
  },
} as const;
