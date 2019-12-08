class Status_old {
    constructor(targetAddress, targetPort) {
        this.curStatus = '';
        this.targetAddress = targetAddress;
        this.targetPort = targetPort;
        // For debugging
        this.counter = 0
    }

    setAddress(){
        this.targetAddress = address;
    };

    setPort() {
        this.targetPort = port;
    };

    getStatus() {
        console.log("Send request to get Status_old Object from "
                    + this.targetAddress
                    + ":" + this.targetPort);
        // FIXME: Set new status with returned object
        let newStatus = this.curStatus;

        // FIXME: this is for debugging
        this.counter += 1;
        if (this.counter % 5 == 0) {
            newStatus = "{Object" + this.counter.toString() + "}";
        }

        if (newStatus != this.curStatus) {
            console.log("Status_old Changed!")
            // TODO: If curStatus has info not available in cluster,
            // we may want to keep them in curStatus.
            this.curStatus = newStatus;
        }
        console.log("Current Status_old: " + this.curStatus)
    };

    getStatusInBackground() {
        var that = this;
        // Send request every 2 seconds.
        setTimeout(function() {
            that.getStatus();
            that.getStatusInBackground();
        }, 2000);
    }

    setStatus(s) {
        this.curStatus = s;
    }
}

module.exports = Status_old;