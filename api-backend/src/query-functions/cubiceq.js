const {
    UserInputError
} = require('apollo-server')

class CubicEquation {
    constructor(y, a, b, c, d) { // quadratic equation coefficients given (in form y = ax^2 + bx + c)
        if (a === 0) throw new UserInputError('Coefficient "a" must be a value not equal to 0')
        if (a === 0 && b === 0 && c === 0 && d === 0) throw new UserInputError("At least one of the coefficients must have a value greater than 0 to solve the quadratic equation.")
        if (y != 0) d -= y // if y is not equal to 0, subtract y from both sides to make one side equal to 0
        this.a = a
        this.b = b
        this.c = c
        this.d = d
    }
    // y = ax^3 + bx^2 + cx + d
    solveEquation() {
        const roots = this._solveCubic(this.a, this.b, this.c, this.d)
        const yIntercept = [0, this.d]
        return {
            roots,
            yIntercept
        }
    }
    _solveCubic(a, b, c, d) {
        if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
            a = b;
            b = c;
            c = d;
            if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
                a = b;
                b = c;
                if (Math.abs(a) < 1e-8) // Degenerate case
                    return [];
                return [-b / a];
            }

            var D = b * b - 4 * a * c;
            if (Math.abs(D) < 1e-8)
                return [-b / (2 * a)];
            else if (D > 0)
                return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
            return [];
        }

        // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
        var p = (3 * a * c - b * b) / (3 * a * a);
        var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
        var roots;

        if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
            roots = [Math.cbrt(-q)];
        } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
            roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
        } else {
            var D = q * q / 4 + p * p * p / 27;
            if (Math.abs(D) < 1e-8) { // D = 0 -> two roots
                roots = [-1.5 * q / p, 3 * q / p];
            } else if (D > 0) { // Only one real root
                var u = Math.cbrt(-q / 2 - Math.sqrt(D));
                roots = [u - p / (3 * u)];
            } else { // D < 0, three roots, but needs to use complex numbers/trigonometric solution
                var u = 2 * Math.sqrt(-p / 3);
                var t = Math.acos(3 * q / p / u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
                var k = 2 * Math.PI / 3;
                roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
            }
        }

        // Convert back from depressed cubic
        for (var i = 0; i < roots.length; i++)
            roots[i] -= b / (3 * a);

        roots = roots.map((el) => {
            el = el.toPrecision(8) // cut off some decimals
            return parseFloat(el) // remove insignificant zeros
        })

        return roots;
    }
}

module.exports = {
    CubicEquation
}