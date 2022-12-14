///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.service.schedulers.treasury;
//
//import ir.tamin.incomeBank.model.schedulers.treasury.TrsDocsData;
//import ir.tamin.incomeBank.model.schedulers.treasury.TrsFileInfo;
//import javax.ejb.Stateless;
//import javax.inject.Inject;
//import javax.persistence.EntityManager;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
///**
// *
// * @author s_maknooni
// */
//@Stateless
//public class TrsDocsDataService {
//
//    @Inject
//    EntityManager entityManager;
//
//    private final Logger logger = LoggerFactory.getLogger(TrsDocsDataService.class);
//
//    public void save(TrsDocsData data) {
//
//        try {
//            entityManager.persist(data);
//            entityManager.flush();
//        } catch (Exception ex) {
//            logger.error("خطا در ذخیره اطلاعات فایل اسناد خزانه اسلامی منتشر شده از سوی بانک ملی", ex);
//        }
//    }
//
//}
