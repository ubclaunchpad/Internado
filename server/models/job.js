"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Job = /** @class */ (function () {
    // Default constructor is used to generate and iterate through the property keys.
    function Job() {
        this.id = null;
        this.job_title = null;
        this.link = null;
        this.description = null;
        this.city = null;
        this.country = null;
        this.latitude = null;
        this.longitude = null;
        this.company_name = null;
        this.start_date = null;
        this.salary_min = null;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint" }),
        __metadata("design:type", Number)
    ], Job.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, length: 256 }),
        __metadata("design:type", String)
    ], Job.prototype, "job_title", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "text" }),
        __metadata("design:type", String)
    ], Job.prototype, "link", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "text" }),
        __metadata("design:type", String)
    ], Job.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, length: 256 }),
        __metadata("design:type", String)
    ], Job.prototype, "city", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, length: 256 }),
        __metadata("design:type", String)
    ], Job.prototype, "state", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, length: 256 }),
        __metadata("design:type", String)
    ], Job.prototype, "country", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "double precision" }),
        __metadata("design:type", Number)
    ], Job.prototype, "latitude", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "double precision" }),
        __metadata("design:type", Number)
    ], Job.prototype, "longitude", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, length: 256 }),
        __metadata("design:type", String)
    ], Job.prototype, "company_name", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "date" }),
        __metadata("design:type", Date)
    ], Job.prototype, "start_date", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "integer" }),
        __metadata("design:type", Number)
    ], Job.prototype, "salary_min", void 0);
    Job = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [])
    ], Job);
    return Job;
}());
exports.default = Job;
//# sourceMappingURL=job.js.map