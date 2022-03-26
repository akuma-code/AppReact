import { makeAutoObservable } from 'mobx'


export default class OgoStore {
    constructor () {
        this._types = [
            { id: 1, type: "OK1", price: 5100, img: "https://avatars.mds.yandex.net/i?id=2322bdf7a353af954cbaf003d2856977-5905964-images-thumbs&n=13&exp=1" },
            { id: 2, type: "OK2", price: 4500, img: "https://yandex-images.clstorage.net/j50EAn232/36281ceD4w/zzWWdkDzkTTrKciU0xCtr3fATxs1bLdJG7yt-CPcPLeJWQ8FcwjVZdMKNEsC5in2u3T5rXtW5_nd6DRgEGciY4Bs0Tpb7d4-6inLmdoLpKh8yEATMXiwS0Prtqx_ymbnkk0EAhpgpxLyMxgvLcBZiPMso_EqT_i6y4FSbUsWexTOEZFnQfLRDPYoqYXKE76NeoFXGQ06rR4jj9e3Q_UR7r9beGcoaaE3xAQQCzbRRa7FCJ_mBW27qc2NbAxGMVkc-DimenbNzCzeHqC50CeOiGG5bzAAJZoxNL71tVTWDOuwSVt1PFmtBdocBikR_0mg4j638gRzhIzIuXouVjtVP9A4pUJE0NUa-BOvtf41mbxLglUsIAeIHz-q5b5i8AnUiHFPdyd7qyrZOjMHCMZHh-kGrtsuZLeh05x9A2Y5UBTrG6lBR_DsM90As4L-Eq2BWI9xETIoiAAWovejS_EQzKxNVFIEdbQ63SQlEzXjfITaJ4zAA0-msM2XQh1wPWYo-wW3ZkTv_BruAIm_xR-CpEmgSC4RFIoXK7vbhln2GviLTGB3BlqUA8IGDQcH_lS3wDSg0D5njLrMjG41Vy96H8sRsG1FyPsy7AOCmsAEp5xprWsZEgiOHzyi059a9CrBvlttSQRtnx7_GC8lCe1bn94Zu94mX4Shz45CI0sgZRPBFohbfsXOI-EQjavUBK-LWoBCDAQOuAQnt9elQ9IrxbN6cUowWY8r4z85Ph3WQJHII77HJkG7j_SUYz1rGUAwzQypUljWzRjfFqyP3xqhsE60VCcSObwVEYjenXvjMOmkXH5CAH6rBvwGEBgm6Vafzjm1-gN0n7Hwp34dQyVcIf8-oWB12O4ozDycjP0Hvqx2vHYSEAa0AwC85oZ78DfNq1VDewxagyT5CDoFLM1JoOUHqOILVb2D9qx4G0MdSAf4DY12cOrcL8QThbnlCKOuWJ52GxMiijwWgv2KUP8" },
            { id: 3, type: "OK3", price: 8100, img: "https://avatars.mds.yandex.net/i?id=0e7c68bbc7663504355f9781cba6830e-5420588-images-thumbs&n=13&exp=1" },
        ]
        this._amount = [
            { id: 1, type: "OK1", count: 5 },
            { id: 2, type: "OK2", count: 5 },
            { id: 3, type: "OK3", count: 5 },

        ]
        this._selectedType = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setAmount(amount) {
        this._amount = amount
    }

    get types() {
        return this._types
    }
    get amount() {
        return this._amount
    }


    setSelectedType(type) {
        this._selectedType = type
    }
    get selectedType() {
        return this._selectedType
    }


}