Ext.define('InsuranceTechnical.helper.Urls', {
    singleton: true,
    // main server
    baseURL: 'https://techins.tamin.ir/api/proxy/models/',
    baseURLFunction: 'https://techins.tamin.ir/api/proxy/functions/',
    baseURLNotFramework: 'https://techins.tamin.ir/api/',

    // test server
    /*baseURL: 'http://techins-test.tamin.ir:7001/api/proxy/models/',
    baseURLFunction: 'http://techins-test.tamin.ir:7001/api/proxy/functions/',
    baseURLNotFramework: 'http://techins-test.tamin.ir:7001/api/',*/
    /*baseURL: 'http://172.16.14.25:7001/api/proxy/models/',
    baseURLFunction: 'http://172.16.14.25:7001/api/proxy/functions/',
    baseURLNotFramework: 'http://172.16.14.25:7001/api/',*/

    // local server
    /*baseURL: 'http://172.16.13.178:7001/api/proxy/models/',
    baseURLFunction: 'http://172.16.13.178:7001/api/proxy/functions/',
    baseURLNotFramework: 'http://172.16.13.178:7001/api/',*/
      
      urls: [
        {
          name: 'brokerWage',
          url: 'broker-report',
          prefix: 'baseURL'
        },
        {
          name: 'brokerWageDetail',
          url: 'broker-report-detail',
          prefix: 'baseURL'
        },
        {
          name: 'brokerWageReportSave',
          url: 'broker-report/save-report',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'brokerWageReportConfirm',
          url: 'broker-report/confirm-report',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'getBrokerByBranch',
          url: 'broker-report/get-broker',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'getBrokerPdf',
          url: 'broker-report/get-broker-pdf',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'getBrokerExcel',
          url: 'broker-report/get-broker-excel',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'getBranchByFilter',
          url: 'organizations/get-branches-by-filter',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'getBranchDetailInfo',
          url: 'organizations/get-branch-detail-info',
          prefix: 'baseURLNotFramework'
        },
        {
          name: 'CityLocal',
          url: 'city',
          prefix: 'baseURL'
        },
        {
          name: 'ProvinceLocal',
          url: 'province',
          prefix: 'baseURL'
        },
        {
            name: 'introductoryReference',
            url: 'introductory-reference',
            prefix: 'baseURL'
        },
        {
            name: 'calculateDaysBetween',
            url: 'calc-months-between-two-dates-rest',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'doctorJob',
            url: 'doctor-job',
            prefix: 'baseURL'
        },
        {
            name: 'specialGroupType',
            url: 'special-group-type',
            prefix: 'baseURL'
        },
        {
            name: 'historyDays',
            url: 'acquire-history-info/history-days',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'historyDaysSenfi',
            url: 'insurance-agreement/history-days-senfi',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'senfiWage',
            url: 'insurance-agreement/lowhigh-wage-senfi',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'introductionReport',
            url: 'insurance-agreement-report/introduction-report',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'answerReport',
            url: 'insurance-agreement-report/answer-report',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'agreementCategoryType',
            url: 'agreement-category-type',
            prefix: 'baseURL'
        },
        {
            name: 'insuranceAgreementRequest',
            url: 'insurance-agreement-request',
            prefix: 'baseURL'
        },
        {
          name: 'insuranceAgreementRequestMedical',
          url: 'insurance-agreement-request-medical',
          prefix: 'baseURL'
        },
        {
            name: 'insuranceAgreementType',
            url: 'insurance-type',
            prefix: 'baseURL'
        },
        {
            name: 'insuranceAgreementCat',
            url: 'category-type',
            prefix: 'baseURL'
        },
        {
            name: 'getProvince',
            url: 'insurance-agreement/get-province',
            prefix: 'baseURLNotFramework'
        },
        {
          name: 'checkMedicalTest',
          url: 'insurance-agreement/control-medical',
          prefix: 'baseURLNotFramework'
        },
        {
            name: 'soldierDuration',
            url: 'soldier-duration',
            prefix: 'baseURL'
        },
        {
            name: 'soldierDurationChange',
            url: 'soldier-duration-change',
            prefix: 'baseURL'
        },
        {
            name: 'cancelEsoldier',
            url: 'soldier-rest/cancel-request',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'esSoldier',
            url: 'soldier-eservice',
            prefix: 'baseURL'
        },
        {
            name: 'getEsSoldier',
            url: 'soldier-rest/get-esoldier',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'sabaSoldierPaymentHistory',
            url: 'soldier-rest/get-saba-payment-history',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'masterDuration',
            url: 'master-duration',
            prefix: 'baseURL'
        },
        {
            name: 'SoldierReqList',
            url: 'soldier',
            prefix: 'baseURL'
        },
        {
            name: 'SoldierNajaLog',
            url: 'soldier-rest/get-naja-log',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'HistoryStatus',
            url: 'soldier-rest/get-history-status',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalculateMonth',
            url: 'soldier-rest/calculate-month',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SoldierManner',
            url: 'soldier-manner',
            prefix: 'baseURL'
        },
        {
            name: 'CityItemPage',
            url: 'insurance/cities/item-page',
            prefix: 'baseURLNotFramework'
        }
        ,
        {
            name: 'InsuranceRegisteration',
            url: 'insurance-registeration',
            prefix: 'baseURL'
        },
        {
            name: 'ForeignInsuranceRegisteration',
            url: 'insurance/foreignData',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'HistoryDuration',
            url: 'history-duration',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'LastInsuranceStatus',
            url: 'last-insurance-status',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcAvgWage',
            url: 'calc-avg-wage',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcAgeOver',
            url: 'calc-age-over',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'ControlStatusTypeIsu',
            url: 'control-status-type-isu',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'ControlStatusTypeIsu',
            url: 'control-status-type-isu',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'ControlTypeIsu',
            url: 'control-status-type-isu/type',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcAgeToDays',
            url: 'calc-age-to-days',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcMinWage',
            url: 'calc-min-wage',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcDetailsCategory',
            url: 'calc-details-category',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'AcquireHistory',
            url: 'acquire-history-info',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'HistoryDurationLimit',
            url: 'history-duration/limit',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'AgreementRequestConfirm',
            url: 'agreement-request-confirm',
            prefix: 'baseURL'
        },
        {
            name: 'CalcAgeOver',
            url: 'calc-age-over',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'Soldier95',
            url: 'soldier95',
            prefix: 'baseURL'
        },
        {
            name: 'Soldier95Duration',
            prefix: 'baseURL',
            url: 'soldier95-duration'
        },
        {
            name: 'Status',
            url: 'status',
            prefix: 'baseURL'
        },
        {
            name: 'AgreementRequest',
            url: 'agreement-request',
            prefix: 'baseURL'
        },
        {
            name: 'AgreementRequestConfirm',
            url: 'agreement-request-confirm',
            prefix: 'baseURL'
        },
        {
            name: 'AgreementCategory',
            url: 'agreement-category',
            prefix: 'baseURL'
        },
        {
            name: 'Workshop',
            url: 'workshop',
            prefix: 'baseURL'
        },
        {
            name: 'InsuranceStatus',
            url: 'insurance-status',
            prefix: 'baseURL'
        },
        {
            name: 'InsuranceType',
            url: 'insurance-type',
            prefix: 'baseURL'
        },
        {
            name: 'AgreementStatus',
            url: 'agreement-status',
            prefix: 'baseURL'
        },
        {
            name: 'DiffDate',
            url: 'diff-date',
            prefix: 'baseURLNotFramework'
        },
        {
            name: "IsuType",
            url: "type-of-isu",
            prefix: 'baseURLFunction'
        },
        {
            name: "CalcAge",
            url: "calc-age",
            prefix: 'baseURLFunction'
        },
        {
            name: "CalcDaysBetweenTwoDates",
            url: "calc-days-between-two-dates",
            prefix: 'baseURLFunction'
        },
        {
            name: 'SoldierDuration',
            prefix: 'baseURL',
            url: 'soldier-duration'
        },
        {
            name: 'ConfirmDisapproval',
            url: 'confirm-disapproval',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'RetDastmozdDay95',
            url: 'ret-dastmozd-day95',
            prefix: 'baseURLFunction'
        },
        {
            name: 'TechResponse',
            url: 'tech-response',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CommissionMemord',
            url: 'commission-memord',
            prefix: 'baseURL'
        },
        {
            name: 'CommitteeMember',
            url: 'committee-member',
            prefix: 'baseURL'
        },
        {
            name: 'CommissionPermit',
            url: 'commission-permit',
            prefix: 'baseURL'
        },
        {
            name: 'CommissionPlace',
            url: 'commission-place',
            prefix: 'baseURL'
        },
        {
            name: 'CommissionMemberType',
            url: 'commission-member-type',
            prefix: 'baseURL'
        },
        {
            name: 'CancelDoc',
            url: 'canceldoc',
            prefix: 'baseURLFunction'
        },
        {
            name: 'MedicalIntroductionReport',
            url: 'medical-introduction-report',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'MedicalInquiryAnswerReport',
            url: 'medical-inquiry-answer-report',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'CalcDaysBetweenTwoDatesRest',
            url: 'calc-days-between-two-dates-rest',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'AgreementInfoFromInsurancedId',
            url: 'agreement-info-from-insuramced-id',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'ControlAllowedWorkshopActivity',
            url: 'control-allowed-workshop-activity',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'IsargaranRequests',
            url: 'isargaran-requests',
            prefix: 'baseURL'
        },
        {
            name: 'IsargaranInfoFromInsurancedId',
            url: 'isargaran-info-from-insuranced-id',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'IsargaranGovermentOrgCode',
            url: 'isargaran-goverment-org-code',
            prefix: 'baseURL'
        },
        {
            name: 'IsargaranDuration',
            url: 'isargaran-duration',
            prefix: 'baseURL'
        },
        {
            name: 'GovermentOrgs',
            url: 'isargaran-goverment-orgs',
            prefix: 'baseURL'
        },
        {
            name: "CurrentUser",
            url: 'users',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'BuildingEngOrgReq',
            url: 'building-eng-org-req',
            prefix: 'baseURL'
        },
        {
            name: 'BuildingEngOrgModify',
            url: 'building-eng-org-modify',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'BuildingEngOrgApprove',
            url: 'building-eng-org-approve',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CheckAgeWorkshopCondition',
            url: 'check-age-workshop',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'BuildingOrgReport',
            url: 'building-eng-reports',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'TransferInsuredToOtherFunds',
            url: 'transfer-insuredto-other-funds',
            prefix: 'baseURL'

        },
        {
            name: 'PensionFunds',
            url: 'pension-funds',
            prefix: 'baseURL'
        },
        {
            name: 'transferToOtherFundsReport',
            url: 'transfer-to-other-funds-report',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'TransferIsuToOtherFundsHistInfo',
            url: 'transfer-isu-to-other-funds-hist-info',
            prefix: 'baseURL'

        },
        {
            name: 'SisChangeHis',
            url: 'sis-change-his',
            prefix: 'baseURL'

        },
        {
            name: 'HistInfo',
            url: 'transfer-to-other-funds-work-details',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'OccurRep',
            url: 'occur-rep',
            prefix: 'baseURL'
        },
        {
            name: 'Occur',
            url: 'occur',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'OccurDocument',
            url: 'occur/e-document-data',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'OccurWorkshop',
            url: 'occur/e-workshop-data',
            prefix: 'baseURLNotFramework'
        },
        {
          name: 'OccurBranchDoc',
          url: 'occur-document',
          prefix: 'baseURL'
        },
        {
          name: 'OccurSignature',
          url: 'occur-signature',
          prefix: 'baseURL'
        },
        {
            name: 'Calculation',
            url: 'calculation',
            prefix: 'baseURL'
        },
        {
            name: 'guardian',
            url: 'guardian',
            prefix: 'baseURL'
        },
        {
            name: 'GuardianOtherBranch',
            url: 'guardian-other-branch',
            prefix: 'baseURLNotFramework'
        },
        {
          name: 'GuardianProvDocument',
          url: 'guardian-document',
          prefix: 'baseURL'
        },
        {
          name: 'DeleteGuardianProvDocument',
          url: 'guardian-spec/delete-document',
          prefix: 'baseURLNotFramework'
        },
        {
            name: 'TransferInsuredToTamin',
            url: 'transfer-insured-to-tamin-view',
            prefix: 'baseURL'
        },
        {
            name: 'TransferToTamin',
            url: 'transfer-to-tamin',
            prefix: 'baseURL'
        },
        {
            name: 'CalcIsar',
            url: 'calc-Isar',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'GuardianReport',
            url: 'guardian-reports',
            prefix: 'baseURLNotFramework'

        },
        {
            name: "IsargaranSpecReport",
            url: "isargaran-spec-report",
            prefix: 'baseURLFunction'
        },
        {
            name: 'IsargaranSpecReport',
            url: 'isargaran-report/isargaran-spec',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'IsargaranStatisticsReport',
            url: 'isargaran-report/isargaran-statistics',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'CreateHistoryIsar',
            url: 'history-isar/create-history-isar',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'DeleteHistoryIsar',
            url: 'history-isar/delete-history-isar',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'DeleteDebitIsar',
            url: 'debit-isar/delete-debit-isar',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'CreateDebitIsar',
            url: 'debit-isar/create-debit-isar',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'Branch',
            url: 'branch',
            prefix: 'baseURL'

        },
        {
            name: 'BranchItem',
            url: 'branch',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'TBOccurType',
            url: 'tb-occur-type',
            prefix: 'baseURL'

        },
        {
            name: 'TbOccurCause',
            url: 'tb-occur-cause',
            prefix: 'baseURL'

        },
        {
            name: 'TbOccurPart',
            url: 'tb-occur-part',
            prefix: 'baseURL'

        },
        {
            name: 'CalcCountSumDurIsargaran',
            url: 'calc-count-sum-dur-isargaran',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'SaveCalcISar',
            url: 'save-calc-isar',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'Soldier',
            url: 'soldier',
            prefix: 'baseURL'
        },
        {
            name: 'SoldierView',
            url: 'soldier-view',
            prefix: 'baseURL'
        },
        {
            name: 'ViewDastmozd',
            url: 'dastmozd/view-dastmozd',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'Coditions',
            url: 'dastmozd/coditions',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcWage',
            url: 'dastmozd/calcWage',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SubSoldier',
            url: 'sub-soldier',
            prefix: 'baseURL'
        },
        {
            name: 'MarjaSoldier',
            url: 'marja-soldier',
            prefix: 'baseURL'
        },
        {
            name: 'OtherPayInfo',
            url: 'other-pay-info',
            prefix: 'baseURL'
        },
        {
            name: 'CalcSoldierItems',
            url: 'calcSoldierItems',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'LoadForm',
            url: 'calcSoldierItems/loadForm',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SaveCalcForm',
            url: 'calcSoldierItems/saveFormCalc',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'DeleteCashDebt',
            url: 'calcSoldierItems/deleteCashDebt',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CalcNewSoldier',
            url: 'calcSoldierItems/calcNewSoldier',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'IssuingDbte',
            url: 'calcSoldierItems/issuingDbte',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SaveFormDebt',
            url: 'calcSoldierItems/saveFormDebt',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'DeleteNonCashDebt',
            url: 'calcSoldierItems/deleteNonCashDebt',
            prefix: 'baseURLNotFramework'
        },
        {
            name: "UpdateAllReqStatus",
            url: "update-all-req-status",
            prefix: 'baseURLFunction'
        },
        {
            name: "UpdateCurStatus",
            url: "update-cur-status",
            prefix: 'baseURLFunction'
        },
        {
            name: 'SoldierSabeghReport',
            prefix: 'baseURLNotFramework',
            url: 'soldier-report/soldier-sabegh'
        },
        {
            name: 'SoldierIstDebitReport',
            prefix: 'baseURLNotFramework',
            url: 'soldier-report/soldier-ist-debit'
        },
        {
            name: 'GetVwsoldierIstStatus',
            prefix: 'baseURLFunction',
            url: 'get-vwsoldier-ist-status'
        },
        {
            name: 'SoldierAttach1Report',
            prefix: 'baseURLNotFramework',
            url: 'soldier-report/soldier-attach1'
        },
        {
            name: 'SoldierAttach4Report',
            prefix: 'baseURLNotFramework',
            url: 'soldier-report/soldier-attach4'
        },
        {
            name: 'SoldierAttach6Report',
            prefix: 'baseURLNotFramework',
            url: 'soldier-report/soldier-attach6'
        },
        {
            name: 'SoldierAcceptOrRefuse',
            prefix: 'baseURLNotFramework',
            url: 'soldier-report/soldier-accept-or-refuse'
        },
        {
            name: 'CalcRefundParams',
            url: 'calcSoldierItems/calcRefundParams',
            prefix: 'baseURLNotFramework'
        },
        {
            name: "RefundDebit",
            url: "refund-debit",
            prefix: 'baseURLFunction'
        },
        {
            name: "refundDetail",
            url: "refund-spec/get-refund-detail",
            prefix: 'baseURLNotFramework'
        },
        {
            name: "refundDebitGrid",
            url: "refund-spec/get-debit-detail",
            prefix: 'baseURLNotFramework'
        },
        {
            name: "SsupOccurIdea",
            url: "ssup-occur-idea",
            prefix: 'baseURL'
        },
        {
            name: 'SisChangeHisNew',
            url: 'sis-change-his-new',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SisChangeHisEdt',
            url: 'sis-change-his-Edt',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'HisRequestType',
            url: 'his-request-type',
            prefix: 'baseURL'
        },
        {
            name: 'GetMinMaxWage',
            url: 'get-min-max-wage',
            prefix: 'baseURLFunction'
        },
        {
            name: "Organizations",
            url: "organizations",
            prefix: 'baseURLNotFramework'
        },
        {
            name: "OrganizationsItemPage",
            url: "organizations/item-page",
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'OccurReport',
            url: 'occur-reports',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'EserviceOccurReport',
            url: 'occur-reports/eservice',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'SsupOccurReview',
            url: 'ssup-occur-review',
            prefix: 'baseURL'
        },
        {
            name: 'SisChangeHisReqReport',
            url: 'sis-change-his-new/reports',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'GhalibafCalcDebit',
            url: 'ghalibaf-calc-debit',
            prefix: 'baseURLFunction'
        },
        {
            name: 'GhalibafShowCalc',
            url: 'ghalibaf-show-calc',
            prefix: 'baseURLFunction'
        },
        {
            name: 'HisHistoryList',
            url: 'sis-change-his-new/his-history-list',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SelfIsuTypeItem',
            url: 'self-isu-type',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'OccurReviewReport',
            url: 'occur-review-report',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'OccurIdeaReport',
            url: 'occur-idea-report',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'GetGhalibafCalcString',
            url: 'get-ghalibaf-calc-string',
            prefix: 'baseURLFunction'
        },
        {
            name: 'SoldierDurationCount',
            url: 'soldier-duration-count',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'transferFormOtherFundsReport',
            url: 'transfer-from-other-funds-report',
            prefix: 'baseURLNotFramework',
        },
        {
            name: 'SandPayInfo',
            url: 'sand-pay-info',
            prefix: 'baseURLNotFramework',
        },
        {
            name: "EntDebitCreate",
            url: "ent-debit-create",
            prefix: 'baseURLFunction'
        },
        {
            name: "EntDebitDelete",
            url: "ent-debit-delete",
            prefix: 'baseURLFunction'
        },
        {
            name: "CreateProvinceEntList",
            url: "create-province-ent-list",
            prefix: 'baseURLFunction'
        },
        {
            name: "CreateSandList",
            url: "create-sand-list",
            prefix: 'baseURLFunction'
        },
        {
            name: "HasAllPermit",
            url: "has-all-permit",
            prefix: 'baseURLFunction'
        },
        {
            name: "ProvinceDetailList",
            url: "province-detail-list",
            prefix: 'baseURLFunction'
        },
        {
            name: "SandDetailList",
            url: "sand-detail-list",
            prefix: 'baseURLFunction'
        },
        {
            name: "CreateEntClaimReminder",
            url: "create-ent-claim-reminder",
            prefix: 'baseURLFunction'
        },
        {
            name: "CreateMovIst",
            url: "create-mov-ist",
            prefix: 'baseURLFunction'
        },
        {
            name: "GetIstPayStatus",
            url: "get-ist-pay-status",
            prefix: 'baseURLFunction'
        },
        {
            name: "RefreshReqStatus",
            url: "refresh-req-status",
            prefix: 'baseURLFunction'
        },
        {
            name: "CancelIstEnt",
            url: "cancel-ist-ent",
            prefix: 'baseURLFunction'
        },
        {
            name: "ReplaceNewEntReq",
            url: "replace-new-ent-req",
            prefix: 'baseURLFunction'
        },
        {
            name: "GetEntPayStatusInfo",
            url: "get-ent-pay-status-info",
            prefix: 'baseURLFunction'
        },
        {
            name: 'EntProvince',
            url: 'ent-province',
            prefix: 'baseURL'
        },
        {
            name: 'EntMojavez',
            url: 'ent-mojavez',
            prefix: 'baseURL'
        },
        {
            name: 'EntSand',
            url: 'ent-sand',
            prefix: 'baseURL'
        },
        {
            name: 'CalcTransferInsuredToTaminItems',
            url: 'calcTransferInsuredToTaminItems',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'EntPayStatusRest',
            url: 'ent-pay-status-rest',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'CoditionsFormCommittee',
            url: 'coditionsFormCommittee',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'TransferToTaminCommittee',
            url: 'transfer-to-tamin-committee',
            prefix: 'baseURL',
        },
        {
            name: 'AgreementMedicalInfo',
            url: 'agreement-medical-info',
            prefix: 'baseURL',
        },
        // {
        //     name: 'HistInfo',
        //     url: 'transfer-to-other-funds-work-details',
        //     prefix: 'baseURLNotFramework'
        // },



        {
            name: 'Coditionconfirm',
            url: 'dastmozd/coditionconfirm',
            prefix: 'baseURLNotFramework'
        },
        {
            name: "RepAgreementMedicalInfo",
            url: "rep-agreement-medical-info",
            prefix: 'baseURLFunction'
        },
        {
            name: 'ssupCalcAgo',
            url: 'ssupCalc/ago',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'ssupCalcSo',
            url: 'ssupCalc/so',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'SubSoldierTemp',
            url: 'sub-soldier-temp',
            prefix: 'baseURL'
        },
        {
            name: 'SubSoldierHistory',
            url: 'sub-soldier-history',
            prefix: 'baseURL'
        },
        {
            name: 'SoldierDurationChange',
            url: 'soldierDurationChange',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'RefundSave',
            url: 'calcSoldierItems/refund-save',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'InsuranceData',
            url: 'insurance/data',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'Province',
            url: 'insurance/province',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'Job',
            url: 'job',
            prefix: 'baseURL'
        },
        {
            name: 'Education',
            url: 'education',
            prefix: 'baseURL'
        },
        {
            name: 'City',
            url: 'insurance/city',
            prefix: 'baseURLNotFramework'
        },
        {
            name: 'Isargaran27AcceptReport',
            url: 'isargaran-report/isargaran27-accept',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'Isargaran27DebittReport',
            url: 'isargaran-report/isargaran27-debit',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'CalcIsar27',
            url: 'calc-Isar/calc-isar-27',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'DocumentData',
            url: 'guardian-other-branch/documentData',
            prefix: 'baseURLNotFramework'

        },
        {
            name: 'GuardianSpec',
            url: 'guardian-spec',
            prefix: 'baseURLNotFramework'
        }
        ,
        {
            name: 'RefundSpec',
            url: 'refund-spec',
            prefix: 'baseURLNotFramework'
        }              
        ,
        {
            name: 'refund',
            url: 'refund',
            prefix: 'baseURL'
        }
        ,
        {
            name: 'refundReason',
            url: 'refund-reason',
            prefix: 'baseURL'
        },
        {
            name: 'refundPayment',
            url: 'refund-payment',
            prefix: 'baseURL'
        }
        ,
        {
            name: 'refundRelation',
            url: 'refund-relation',
            prefix: 'baseURL'
        }
        ,
        {
            name: 'subDominant',
            url: 'refund-spec/active-subdominant',
            prefix: 'baseURLNotFramework'
        }
        ,
        {
            name: 'refundCalculate',
            url: 'refund-spec/refund-calculate',
            prefix: 'baseURLNotFramework'
        }
        
    ],
    getUrl: function (name) {
        var me = this;
        var result = '';
        Ext.each(me.urls, function (item) {
            if (item.name === name) {
                result = me[item.prefix] + item.url;
            }
        });
        if (result === '') {
            throw 'there is no url associated with ' + name;
        }
        return result;
    }
});
