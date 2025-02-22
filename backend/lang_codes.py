# Dictionary of supported languages
lang_codes = {
    'afrikaans': 'af', 'albanian': 'sq', 'amharic': 'am', 'arabic': 'ar', 'armenian': 'hy',
    'bengali': 'bn', 'bosnian': 'bs', 'catalan': 'ca', 'croatian': 'hr', 'czech': 'cs',
    'danish': 'da', 'dutch': 'nl', 'english': 'en', 'estonian': 'et', 'finnish': 'fi',
    'french': 'fr', 'georgian': 'ka', 'german': 'de', 'greek': 'el', 'gujarati': 'gu',
    'haitian creole': 'ht', 'hindi': 'hi', 'hungarian': 'hu', 'icelandic': 'is', 'indonesian': 'id',
    'irish': 'ga', 'italian': 'it', 'japanese': 'ja', 'javanese': 'jw', 'kannada': 'kn',
    'kazakh': 'kk', 'khmer': 'km', 'korean': 'ko', 'kurdish': 'ku', 'lao': 'lo',
    'latin': 'la', 'latvian': 'lv', 'macedonian': 'mk', 'malay': 'ms', 'malayalam': 'ml',
    'marathi': 'mr', 'mongolian': 'mn', 'nepali': 'ne', 'norwegian': 'no', 'pashto': 'ps',
    'persian': 'fa', 'polish': 'pl', 'portuguese': 'pt', 'punjabi': 'pa', 'romanian': 'ro',
    'russian': 'ru', 'serbian': 'sr', 'sinhalese': 'si', 'slovak': 'sk', 'slovenian': 'sl',
    'spanish': 'es', 'swahili': 'sw', 'swedish': 'sv', 'tamil': 'ta', 'telugu': 'te',
    'thai': 'th', 'turkish': 'tr', 'ukrainian': 'uk', 'urdu': 'ur', 'vietnamese': 'vi', 'welsh': 'cy',
    'hebrew': 'he', 'chinese (simplified)': 'zh-CN', 'chinese (traditional)': 'zh-TW'
}
# Get language name from code, like: en->english
reverse_lang_codes = {v: k for k, v in lang_codes.items()}  