export const stringToSlug: (string: string) => string = (str: string) => {
    let from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }
    str = str.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/-+/g, '-');

    return str;
};

let default_numbers = ' hai ba bốn năm sáu bảy tám chín';
let dict = {
    units: ('? một' + default_numbers).split(' '),
    tens: ('lẻ mười' + default_numbers).split(' '),
    hundreds: ('không một' + default_numbers).split(' '),
};
const tram = 'trăm';
var digits = 'x nghìn triệu tỉ nghìn'.split(' ');

function tenth(block_of_2: any) {
    var sl1 = dict.units[block_of_2[1]];
    var result = [dict.tens[block_of_2[0]]];
    if (block_of_2[0] > 0 && block_of_2[1] == 5) sl1 = 'lăm';
    if (block_of_2[0] > 1) {
        result.push('mươi');
        if (block_of_2[1] == 1) sl1 = 'mốt';
    }
    if (sl1 != '?') result.push(sl1);
    return result.join(' ');
}

function block_of_three(block: any) {
    switch (block.length) {
        case 1:
            return dict.units[block];

        case 2:
            return tenth(block);

        case 3:
            var result = [dict.hundreds[block[0]], tram];
            if (block.slice(1, 3) != '00') {
                var sl12 = tenth(block.slice(1, 3));
                result.push(sl12);
            }
            return result.join(' ');
    }
    return '';
}

function digit_counting(i: any, digit_counter: any) {
    var result = digits[i];
    return result;
}
export const to_vietnam_dong: (money: string) => string = (input: string) => {
    var str = parseInt(input) + '';
    var index = str.length;
    if (index == 0 || str == 'NaN') return '';
    var i = 0;
    var arr = [];
    var result = [];

    //explode number string into blocks of 3numbers and push to queue
    while (index >= 0) {
        arr.push(str.substring(index, Math.max(index - 3, 0)));
        index -= 3;
    }
    //loop though queue and convert each block
    let digit_counter = 0;
    let digit;
    for (i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == '000') {
            digit_counter += 1;
            if (i == 2 && digit_counter == 2) {
                result.push(digit_counting(i + 1, digit_counter));
            }
        } else if (arr[i] != '') {
            digit_counter = 0;
            result.push(block_of_three(arr[i]));
            digit = digit_counting(i, digit_counter);
            if (digit && digit != 'x') result.push(digit);
        }
    }
    result.push('đồng');
    //remove unwanted white space
    return result.join(' ');
};

// export genQRCodeBase64 = ({
//     bank = '',
//     accountName = '',
//     accountNumber = '',
//     amount = '',
//     memo = '',
//     template = 'qr_only',
// }) =>{
//         return await postData(`https://api.vietqr.io/v2/generate`, {
//             accountNo: accountNumber,
//             accountName: accountName,
//             acqId: bank,
//             addInfo: memo,
//             amount: amount,
//             template: template,
//         });
//     }
// }
