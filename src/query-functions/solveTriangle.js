const {
    UserInputError
} = require('apollo-server')

class Triangle {
    constructor(sides, angles) {
        let sidesLen = 0
        let anglesLen = 0
        for (const num of sides) // counts how many side values are not null
            if (num) sidesLen++

        for (const num of angles) // counts how many angle values are not null
            if (num) anglesLen++

        // check if the number of values they gave is not equal to 3
        if (sidesLen + anglesLen !== 3) throw new UserInputError('There must be only three angles/sides.')

        // not solvable without at least one side
        if (sidesLen === 0) throw new UserInputError('There must be at least one side')

        // if the arrays do not have a length of 3, there is no triangle
        if (sides.length !== 3 || angles.length !== 3) throw new UserInputError('A triangle has 3 sides and 3 angles. If you do not know the side, put null for that side')

        // check if all lengths are positive or not equal to 0
        for (let i = 0; i < sides.length; i++) {
            // check if the values are negative and ignore null values
            if ((sides[i] < 1 && sides[i]) || (angles[i] < 1 && angles[i])) throw new UserInputError('Sides and angles can only be positive')
            // check if values are equal to 0 (above if statement doesn't catch this)
            if (sides[i] === 0 || angles[i] === 0) throw new UserInputError('Sides and angles cannot be equal to 0')
        }

        // check if triangle is even possible to solve using triangle inequality theorem
        if (sidesLen === 3 && ((sides[0] + sides[1] < sides[2]) || (sides[0] + [sides[2]] < sides[1]) || (sides[1] + sides[2] < sides[0]))) throw new UserInputError('The triangle is not solvable')

        // check if all angles combined is === 180
        if (anglesLen === 3 && (angles[0] + angles[1] + angles[2] !== 180)) throw new UserInputError('Angles must sum to 180 degrees')


        this.slength = sidesLen
        this.alength = anglesLen
        this.sides = sides
        this.angles = angles
    }

    solveTriangle() {
        let a = this.sides[0]
        let b = this.sides[1]
        let c = this.sides[2]
        let A = this.angles[0]
        let B = this.angles[1]
        let C = this.angles[2]

        function lawOfSines(side1, side2, angle1, angle2) {
            angle1 = angle1 / 180 * Math.PI // convert to radians
            angle2 = angle2 / 180 * Math.PI
            if (!side1 && side2 && angle1 && angle2) { // finds the unknown side (side1)
                return (side2 / Math.sin(angle2)) * Math.sin(angle1)
            } else if (!side2 && side1 && angle1 && angle2) { // finds the unknown side (side2)
                return (side1 / Math.sin(angle1)) * Math.sin(angle2)
            } else if (!angle1 && side1 && side2 && angle2) { // finds the unknown angle (angle1)
                return Math.asin((side1 * Math.sin(angle2)) / side2) / Math.PI * 180 // convert to degrees from radians
            } else if (!angle2 && side1 && side2 && angle1) { // finds the unknown angle (angle2)
                return Math.asin((side2 * Math.sin(angle1)) / side1) / Math.PI * 180
            } else return
        }

        function lawOfCosines(side1, side2, angle1) {
            return Math.sqrt((side1 ** 2 + side2 ** 2) - (2 * side1 * side2 * Math.cos(angle1 / 180 * Math.PI))) // convert the angle to radians, then basic law of cos formula
        }

        function SSS(a, b, c) { // SSS triangles
            return {
                A: Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)) / Math.PI * 180, // using law of cosines to solve for degrees
                B: Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)) / Math.PI * 180,
                C: Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b)) / Math.PI * 180
            }
        }

        function AASandASA(s1, s2, s3, a1, a2, a3) { // AAS and ASA triangles
            if (!a1) a1 = 180 - a2 - a3
            if (!a2) a2 = 180 - a1 - a3
            if (!a3) a3 = 180 - a1 - a2
            if (s1) {
                s2 = lawOfSines(s1, s2, a1, a2)
                s3 = lawOfSines(s1, s3, a1, a3)
            } else if (s2) {
                s1 = lawOfSines(s1, s2, a1, a2)
                s3 = lawOfSines(s2, s3, a2, a3)
            } else if (s3) {
                s1 = lawOfSines(s1, s3, a1, a3)
                s2 = lawOfSines(s2, s3, a2, a3)
            }
            return {
                A: a1,
                B: a2,
                C: a3,
                a: s1,
                b: s2,
                c: s3
            }
        }

        function SASandSSA(s1, s2, s3, a1, a2, a3) { // SAS and SSA triangles
            const goodAngle = a1 ? 'a1' : a2 ? 'a2' : 'a3'
            const badSide = !s1 ? 's1' : !s2 ? 's2' : 's3'

            // SAS triangles
            if (goodAngle === 'a1' && badSide === 's1') {
                s1 = lawOfCosines(s2, s3, a1)
                a2 = lawOfSines(s1, s2, a1, a2)
                a3 = 180 - a1 - a2
            } else if (goodAngle === 'a2' && badSide === 's2') {
                s2 = lawOfCosines(s1, s3, a2)
                a1 = lawOfSines(s1, s2, a1, a2)
                a3 = 180 - a1 - a2
            } else if (goodAngle === 'a3' && badSide === 's3') {
                s3 = lawOfCosines(s1, s2, a3)
                a1 = lawOfSines(s1, s3, a1, a3)
                a2 = 180 - a1 - a3
            }
            // SSA triangles
            if (badSide === 's1') {
                if (goodAngle === 'a2') {
                    // s2 s3 a2
                    a3 = lawOfSines(s2, s3, a2, a3)
                    a1 = 180 - a2 - a3
                    s1 = lawOfSines(s1, s2, a1, a2)
                } else if (goodAngle === 'a3') {
                    // s2 s3 a3
                    a2 = lawOfSines(s2, s3, a2, a3)
                    a1 = 180 - a2 - a3
                    s1 = lawOfSines(s1, s2, a1, a2)
                }
            } else if (badSide === 's2') {
                if (goodAngle === 'a1') {
                    // s1 s3 a1
                    a3 = lawOfSines(s1, s3, a1, a3)
                    a2 = 180 - a1 - a3
                    s2 = lawOfSines(s2, s3, a2, a3)
                } else if (goodAngle === 'a3') {
                    // s1 s3 a3
                    a1 = lawOfSines(s1, s3, a1, a3)
                    a2 = 180 - a1 - a3
                    s2 = lawOfSines(s2, s3, a2, a3)
                }
            } else if (badSide === 's3') {
                if (goodAngle === 'a1') {
                    // s1 s2 a1
                    a2 = lawOfSines(s1, s2, a1, a2)
                    a3 = 180 - a1 - a2
                    s3 = lawOfSines(s2, s3, a2, a3)
                } else if (goodAngle === 'a2') {
                    // s1 s2 a2
                    a1 = lawOfSines(s1, s2, a1, a2)
                    a3 = 180 - a1 - a2
                    s3 = lawOfSines(s2, s3, a2, a3)
                }
            }

            return {
                A: a1,
                B: a2,
                C: a3,
                a: s1,
                b: s2,
                c: s3
            }
        }
        if (this.slength === 3) { // SSS
            const angles = SSS(a, b, c)
            A = angles.A
            B = angles.B
            C = angles.C
        } else if (this.slength === 1 && this.alength === 2) { // AAS, ASA
            const AASandASAlengths = AASandASA(this.sides[0], this.sides[1], this.sides[2], this.angles[0], this.angles[1], this.angles[2])
            a = AASandASAlengths.a
            b = AASandASAlengths.b
            c = AASandASAlengths.c
            A = AASandASAlengths.A
            B = AASandASAlengths.B
            C = AASandASAlengths.C
        } else if (this.slength === 2 && this.alength === 1) { // SAS, SSA
            const SASandSSAlengths = SASandSSA(this.sides[0], this.sides[1], this.sides[2], this.angles[0], this.angles[1], this.angles[2])
            a = SASandSSAlengths.a
            b = SASandSSAlengths.b
            c = SASandSSAlengths.c
            A = SASandSSAlengths.A
            B = SASandSSAlengths.B
            C = SASandSSAlengths.C
        }

        const angles = [A, B, C]
        const sides = [a, b, c]

        // checks for any undefined values in the sides/angles
        for (const num of angles.concat(sides)) {
            if (!num) throw new Error('Triangle is not solvable')
        }

        // area
        const area = (a * b * Math.sin(C / 180 * Math.PI)) / 2
        // perimeter and semi-perimeter
        const perimeter = a + b + c
        const semiPerimeter = perimeter / 2
        // heights
        const height_a = (2 * area) / a
        const height_b = (2 * area) / b
        const height_c = (2 * area) / c
        const heights = [height_a, height_b, height_c]
        // medians
        const median_a = Math.sqrt(((a / 2) ** 2 + c ** 2) - (a * c * Math.cos(B / 180 * Math.PI)))
        const median_b = Math.sqrt(((b / 2) ** 2 + a ** 2) - (a * b * Math.cos(C / 180 * Math.PI)))
        const median_c = Math.sqrt(((c / 2) ** 2 + b ** 2) - (b * c * Math.cos(A / 180 * Math.PI)))
        const medians = [median_a, median_b, median_c]
        // name
        
        let name = ''
        if (angles.some(val => val > 90)) {
            name += 'obtuse '
        } else name += 'acute '

        if (new Set(angles).size === 1) name += 'equalateral triangle'
        else if (new Set(angles).size === 3) name += 'scalene triangle'
        else name += 'isosceles triangle'

        return {
            sides,
            angles,
            area,
            perimeter,
            semiPerimeter,
            heights,
            medians,
            name
        }
    }
}

module.exports = {
    Triangle
}