require('dotenv').config()
const { Languages } = require('../../db')

let arr = [
	'./language_ae.json',
    './language_cs.json',
    './language_de.json',
    './language_el.json',
    './language_en.json',
    './language_es.json',
    './language_fr.json',
    './language_hu.json',
    './language_id.json',
	'./language_il.json',
	'./language_it.json',
	'./language_ko.json',
	'./language_lt.json',
	'./language_nl.json',
	'./language_pl.json',
	'./language_pt.json',
	'./language_ru.json',
	'./language_sv.json',
	'./language_tr.json',
	'./language_uk.json',
	'./language_vi.json',
	'./language_zh-TW.json',
];

// let arr = ['./language_vi.json'];

for (let i = 0; i < arr.length; i++) {
	const TransFile = require(arr[i]);
	const { lang, discord_lang } = TransFile[0]

	Object.entries(TransFile[1]).forEach(async ([name, text]) => {
		let LangItem = await Languages.findOne({ name, lang })

		if (LangItem === null) LangItem = new Languages()

		LangItem.overwrite({
			lang, name, text, discord_lang
		})

		console.log(`Adding => ${lang} : ${name}`)
		await LangItem.save()
		console.log(`Added! ${lang} : ${name}`)
	})
}
