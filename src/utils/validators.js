export const validateCPF = (rule, value) => {
    if (value && value !== "") {
        value = value.replace(/\D/g, '');
        if (value.toString().length != 11 || /^(\d)\1{10}$/.test(value))
            return Promise.reject("CPF Inválido");

        var result = true;
        [9, 10].forEach(function (j) {
            var soma = 0, r;
            value.split(/(?=)/).splice(0, j).forEach(function (e, i) {
                soma += parseInt(e) * ((j + 2) - (i + 1));
            });
            r = soma % 11;
            r = (r < 2) ? 0 : 11 - r;
            if (r != value.substring(j, j + 1)) result = false;
        });

        if (result)
            return Promise.resolve();
        else
            return Promise.reject("CPF Inválido");
    } else {
        return Promise.reject("Não pode estar vazio");
    }
};

export const validatePassword = (rule, value) => {
    if (value) {
        if (value.length < 8) {
            return Promise.reject("Mínimo 8 caracteres");
        } else if (value.length > 50) {
            return Promise.reject("Senha muito grande");
        }
    } else {
        return Promise.reject("Não pode estar vazio");
    }
    return Promise.resolve();
};