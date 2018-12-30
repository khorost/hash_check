function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

function onUpdateParams() {
    const secret_code = getParam('secret_code');
    const hash_code = CryptoJS.MD5(secret_code).toString();
    const public_code = getParam('public_code');

    $('#secret_code').val(secret_code);
    $('#hash_code').val(hash_code);
    $('#public_code').val(public_code);

    onCheck();
}

function onCheck() {
    const secret_code = $("#secret_code").val();
    const hash_code = $("#hash_code").val();
    const public_code = $("#public_code").val();

    let result = '';
    let status = true;

    let max_count = Math.max(hash_code.length, public_code.length);

    for (let k = 0; k < max_count; ++k) {
        if (k >= hash_code.length || k >= public_code.length || hash_code[k] !== public_code[k]) {
            result += '1';
            status = false;
        } else {
            result += '0';
        }
    }

    $('#result_code').html(result);

    if (status) {
        $('#result_container')
            .removeClass("alert-warning")
            .addClass("alert-success");
    } else {
        $('#result_container')
            .removeClass("alert-success")
            .addClass("alert-warning");
    }
}

$(function () {
    onUpdateParams();

    $("#secret_code").on('change keyup paste', function () {
        const secret_code = $("#secret_code").val();
        $('#hash_code').val(CryptoJS.MD5(secret_code).toString());

        onCheck();
    });

    $("#hash_code").on('change keyup paste', function () {
        onCheck();
    });

    $("#public_code").on('change keyup paste', function () {
        onCheck();
    });
});
