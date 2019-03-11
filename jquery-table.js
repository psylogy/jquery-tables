var Backend = /** @class */ (function () {
    function Backend() {
    }
    Backend.Post = function () {
        var _this = this;
        $.ajax({
            type: "POST",
            url: "./get_page.php",
            data: {},
            success: function (data) { return _this.AfterPost(data); },
            dataType: "text"
        });
    };
    Backend.AfterPost = function (data) {
        if ($('#frame').attr('data-cach').indexOf(data) === -1) {
            localStorage.setItem('curent_page', data);
            $('#frame').attr('src', data);
            $('#frame').attr('data-cach', data);
        }
    };
    return Backend;
}());
Backend.Post();
setInterval(function () { Backend.Post(); }, 5000);
var curent_page = localStorage.getItem('curent_page');
