const countryList = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cura?ao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'R?union', 'Romania', 'Russia', 'Rwanda', 'Saint Barth?lemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'S?o Tom? and Pr?ncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
    inputCountry = document.querySelector('.i__country'),
    selectList = document.querySelector('.s__country');

let resultForCompareWordToStr,
    iter = 0,
    compare = 0;

inputCountry.addEventListener('keyup', findWord);
selectList.addEventListener('change', selectedCountry);

// Основаная функция стартует по событию изменения input.value ====================================================================

function findWord() {
    let arr = countryList;

    cleanOptions(); // очистка ранее созданных option в select для стран

    if(inputCountry.value == '') {       // проверка на пустое значение input
        selectList.style.display = 'none';
    }
    else {
        selectList.style.display = 'block';
        str = toRightFormat(inputCountry.value);   // Функция преобразования введеного значения input.value в правильный формат
    }

    for(let i = 0; i < arr.length; i++) {   // перебор массива стран для сравнения
        iter = 0;
        compare = 0;

        compareWordToStr(arr[i], str);     // сравнение стран с input.value, если совпадает переменная resultForCompareWordToStr = true
        if(resultForCompareWordToStr == true) {   
            generateOptions(arr[i]);            // добавление страны в список через функцию генерации option
        }
    }
}

// Функция сравнения слова с строкой ========================================================================================

function compareWordToStr(word, str) {
    if(compareSymb(word[iter], str[iter]) && str[iter] != undefined) {
        iter++;
        compare++;
        
        compareWordToStr(word, str);
    }
    else if(compare == str.length) {
        resultForCompareWordToStr = true;
       
    }
    else resultForCompareWordToStr = false;
}

// Подфункция сравнения символов

function compareSymb(sym1, sym2) {
    if(sym1 == sym2) {
        return true;
    }
    else return false;
}

// Функция генерации option для select с названием страны ====================================================================

function generateOptions(word) {
    let opt = document.createElement('option');

    opt.innerHTML = word;

    selectList.append(opt);
}

// Очистка устарвших option в списке select стран ============================================================================

function cleanOptions() {
    let allOpts = document.querySelectorAll('.s__country option');

    for(let i = 0; i < allOpts.length; i++) {
        allOpts[i].remove();
    }

    defaultOpt();
}

// Функция корректирующая формат введеного значения input.value =============================================================

function toRightFormat(str) {
    let result;
    
    if(str[0] == str[0].toLowerCase()) {
        result = str[0].toUpperCase();
    }
    else result = str[0];

    for(let i = 1; i < str.length; i++) {
        result += str[i].toLowerCase();
    }
    return result;
}

// Функция вывода выбранной строки, функция запускается по события выбора навешеному на select =================================

function selectedCountry() {
    inputCountry.value = this.value;
}

// Функция создания деволтного (первого) option с буквой страны ================================================================

function defaultOpt() {
    let opt = document.createElement('option');

    opt.innerHTML = `Country list on "${inputCountry.value}..."`;
    opt.setAttribute('hidden', '');
    
    selectList.append(opt);
}