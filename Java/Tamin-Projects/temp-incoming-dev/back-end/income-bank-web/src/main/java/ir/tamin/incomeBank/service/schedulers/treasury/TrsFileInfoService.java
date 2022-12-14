///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package ir.tamin.incomeBank.service.schedulers.treasury;
//
//import ir.tamin.incomeBank.model.schedulers.treasury.TrsFileInfo;
//import java.util.List;
//import javax.ejb.Stateless;
//import javax.inject.Inject;
//import javax.persistence.EntityManager;
//import javax.persistence.Query;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
///**
// *
// * @author s_maknooni
// */
//@Stateless
//public class TrsFileInfoService {
//
//    @Inject
//    EntityManager entityManager;
//
//    private final Logger logger = LoggerFactory.getLogger(TrsFileInfoService.class);
//
//    public TrsFileInfo getFileInfoByDate(String fileDate) {
//        try {
//            Query query = entityManager.createNamedQuery("TrsFileInfo.findByFileDate");
//            List<TrsFileInfo> list = query.setParameter("fileDate", fileDate).getResultList();
//            if (!list.isEmpty()) {
//                return (TrsFileInfo) list.get(0);
//            } else {
//                return null;
//            }
//        } catch (Exception ex) {
//            logger.error("خطا در بازیابی اطلاعات فایل با تاریخ", ex);
//            return null;
//        }
//    }
//
//    public void save(TrsFileInfo fileInfo) {
//        try {
//            entityManager.persist(fileInfo);
//            entityManager.flush();
//        } catch (Exception ex) {
//            logger.error("خطا در ذخیره اطلاعات فایل اسناد خزانه اسلامی منتشر شده از سوی بانک ملی", ex);
//        }
//    }
//
//}
