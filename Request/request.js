function Request () {
    this.request = '';
    this.targetAddress = '';
    this.targetPort = '';
    this.targetId = '';
    this.sourceAddress = "10.0.0.99";
    this.sourcePort = 99;
    this.data = [];

    this.create = function () {
        this.request = "create";
        return this;
    };

    this.read = function () {
        this.request = "read";
        return this;
    };

    this.update = function () {
        this.request = "update";
        return this;
    };

    this.delete = function () {
        this.request = "delete";
        return this;
    };

    this.setAddress = function (address) {
        this.targetAddress = address;
        return this;
    };

    this.setPort = function (port) {
        this.targetPort = port;
        return this;
    };

    this.setId = function (id) {
        this.targetId = id;
        return this;
    };

    this.addData = function (data) {
        if (!Array.isArray(this.data)) {
            this.data = [];
        }
        this.data.push(data);
        return this;
    };

    this.send = function () {
        console.log(JSON.stringify(this));
    };
}

module.exports = Request;