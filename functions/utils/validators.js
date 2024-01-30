
exports.isObjectFulfilled = function(obj) {
    for (let key in obj) {
        const value = obj[key];
        if (typeof value === "string" && value.trim() === "") {
            return false;
        } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                
                for (let prop in item) {
                    if (typeof item[prop] === "string" && item[prop].trim() === "") {
                        return false;
                    }
                }
            }
        } else if (typeof value === "object" && value !== null) {
            exports.isObjectFulfilled(value);
        }
    }
    return true;
  }