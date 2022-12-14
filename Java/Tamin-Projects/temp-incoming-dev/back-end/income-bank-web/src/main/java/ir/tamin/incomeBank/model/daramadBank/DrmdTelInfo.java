/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author f_fotuhi
 */
@Entity
//@Table(name = "DRMD_TELINFO")
//TODO
@Table(name = "vwrepdrmd_tel_core")
public class DrmdTelInfo implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected DrmdTelInfoPK drmdTelInfoPK;

    @Column(name = "RCV_CHK")
    private Long rcvChk;
    @Column(name = "RCV_CHKG")
    private Long rcvChkg;
    @Column(name = "RCV_CAS")
    private Long rcvCas;
    @Column(name = "RCV_HAV")
    private Long rcvHav;
    @Column(name = "PAY_BES")
    private Long payBes;
    @Column(name = "RCV_SAD")
    private Long rcvSad;
    @Column(name = "PAY_SHOB")
    private Long payShob;
    @Column(name = "RCV_NASH")
    private Long rcvNash;
    @Column(name = "CURN_PYM")
    private Long curnPym;
    @Column(name = "LAST_PYM")
    private Long lastPym;
    @Column(name = "CURN_NPY")
    private Long curnNpy;
    @Column(name = "LAST_NPY")
    private Long lastNpy;
    @Column(name = "DOLAT_27")
    private Long dolat27;
    @Column(name = "KAMEL_18")
    private Long kamel18;
    @Column(name = "DOLAT_18")
    private Long dolat18;
    @Column(name = "PAY_AZAD")
    private Long payAzad;
    @Column(name = "PAY_AZAD1")
    private Long payAzad1;
    @Column(name = "TDARMAN")
    private Long tdarman;
    @Column(name = "PAY_RAN")
    private Long payRan;
    @Column(name = "PAY_RAN1")
    private Long payRan1;
    @Column(name = "PAY_TRNZT")
    private Long payTrnzt;
    @Column(name = "PAY_BLD")
    private Long payBld;
    @Column(name = "PAY_PASB")
    private Long payPasb;
    @Column(name = "LAST_BIK")
    private Long lastBik;
    @Column(name = "CURN_BIK")
    private Long curnBik;
    @Column(name = "JARIMEH")
    private Long jarimeh;
    @Column(name = "KHESARAT")
    private Long khesarat;
    @Column(name = "PSNT1")
    private Long psnt1;
    @Column(name = "PSNT2")
    private Long psnt2;
    @Column(name = "PSNT3")
    private Long psnt3;
    @Column(name = "JANB1")
    private Long janb1;
    @Column(name = "JANB2")
    private Long janb2;
    @Column(name = "ADY1")
    private Long ady1;
    @Column(name = "ADY2")
    private Long ady2;
    @Column(name = "K_LH_BN")
    private Long kLhBn;
    @Column(name = "S_LH_BN")
    private Long sLhBn;
    @Column(name = "K_LH_BH")
    private Long kLhBh;
    @Column(name = "S_LH_BH")
    private Long sLhBh;
    @Column(name = "S_LN_BH")
    private Long sLnBh;
    @Column(name = "K_27_K")
    private Long k27K;
    @Column(name = "T_27_K")
    private Long t27K;
    @Column(name = "K_18_K")
    private Long k18K;
    @Column(name = "T_18_K")
    private Long t18K;
    @Column(name = "K_27_D")
    private Long k27D;
    @Column(name = "T_27_D")
    private Long t27D;
    @Column(name = "K_18_D")
    private Long k18D;
    @Column(name = "T_18_D")
    private Long t18D;
    @Column(name = "K_27_M")
    private Long k27M;
    @Column(name = "T_27_M")
    private Long t27M;
    @Column(name = "K_18_M")
    private Long k18M;
    @Column(name = "T_18_M")
    private Long t18M;
    @Column(name = "K_27_MD")
    private Long k27Md;
    @Column(name = "T_27_MD")
    private Long t27Md;
    @Column(name = "K_18_MD")
    private Long k18Md;
    @Column(name = "T_18_MD")
    private Long t18Md;
    @Column(name = "EKH12")
    private Long ekh12;
    @Column(name = "EKH14")
    private Long ekh14;
    @Column(name = "EKH18")
    private Long ekh18;
    @Column(name = "AZD12")
    private Long azd12;
    @Column(name = "AZD14")
    private Long azd14;
    @Column(name = "AZD18")
    private Long azd18;
    @Column(name = "NDARMAN")
    private Long ndarman;
    @Column(name = "TJANB1")
    private Long tjanb1;
    @Column(name = "TJANB2")
    private Long tjanb2;
    @Column(name = "TJANB3")
    private Long tjanb3;
    @Column(name = "K_N_BIK")
    private Long kNBik;
    @Column(name = "S_N_BIK")
    private Long sNBik;
    @Column(name = "K_H_BIK")
    private Long kHBik;
    @Column(name = "S_H_BIK")
    private Long sHBik;
    @Column(name = "K_NH_BIK")
    private Long kNhBik;
    @Column(name = "S_NH_BIK")
    private Long sNhBik;
    @Column(name = "KPSNT1")
    private Long kpsnt1;
    @Column(name = "TPSNT1")
    private Long tpsnt1;
    @Column(name = "KPSNT2")
    private Long kpsnt2;
    @Column(name = "TPSNT2")
    private Long tpsnt2;
    @Column(name = "KPSNT3")
    private Long kpsnt3;
    @Column(name = "TPSNT3")
    private Long tpsnt3;
    @Column(name = "KPSNT4")
    private Long kpsnt4;
    @Column(name = "TPSNT4")
    private Long tpsnt4;
    @Column(name = "BAR_BAR")
    private Long barBar;
    @Column(name = "NPAY_RAN")
    private Long npayRan;
    @Column(name = "MOS_BAR")
    private Long mosBar;
    @Column(name = "NPAY_RAN1")
    private Long npayRan1;
    @Column(name = "BLD_MTR")
    private Long bldMtr;
    @Column(name = "NPAY_BLD")
    private Long npayBld;
    @Column(name = "NPAY_PASB")
    private Long npayPasb;
    @Column(name = "CHK_RETM")
    private Long chkRetm;
    @Column(name = "CHK_RETN")
    private Long chkRetn;
    @Column(name = "N_BIMTEMP")
    private Long nBimtemp;
    @Column(name = "N_BIMASLI")
    private Long nBimasli;
    @Column(name = "P_BLD3")
    private Long pBld3;
    @Column(name = "P_BLD4")
    private Long pBld4;
    @Column(name = "P_AZD01")
    private Long pAzd01;
    @Column(name = "P_AZD02")
    private Long pAzd02;
    @Column(name = "P_AZD03")
    private Long pAzd03;
    @Column(name = "P_EKH11")
    private Long pEkh11;
    @Column(name = "P_EKH12")
    private Long pEkh12;
    @Column(name = "P_EKH13")
    private Long pEkh13;
    @Column(name = "D_AZD01")
    private Long dAzd01;
    @Column(name = "D_AZD02")
    private Long dAzd02;
    @Column(name = "D_AZD03")
    private Long dAzd03;
    @Column(name = "D_EKH11")
    private Long dEkh11;
    @Column(name = "D_EKH12")
    private Long dEkh12;
    @Column(name = "D_EKH13")
    private Long dEkh13;
    @Column(name = "NEW_RAN")
    private Long newRan;
    @Column(name = "NEW_RANJAR")
    private Long newRanjar;
    @Column(name = "NEW_BAF")
    private Long newBaf;
    @Column(name = "BAFANDEH")
    private Long bafandeh;
    @Column(name = "BAF_DLT")
    private Long bafDlt;
    @Column(name = "RANANDEH")
    private Long ranandeh;
    @Column(name = "ATBIG")
    private Long atbig;
    @Column(name = "NOATBIG")
    private Long noatbig;
    @Column(name = "NOKAR")
    private Long nokar;
    @Column(name = "P_EKH14")
    private Long pEkh14;
    @Column(name = "D_EKH14")
    private Long dEkh14;
    @Column(name = "EKH21")
    private Long ekh21;
    @Column(name = "PAY_HARD")
    private Long payHard;
    @Column(name = "NO_HARD")
    private Long noHard;
    @Column(name = "KAR_HARD")
    private Long karHard;
    @Column(name = "MHLP49")
    private Long mhlp49;
    @Column(name = "MKAR49")
    private Long mkar49;
    @Column(name = "MBIM49")
    private Long mbim49;
    @Column(name = "RAN_MIN")
    private Long ranMin;
    @Column(name = "NO_MIN")
    private Long noMin;
    @Column(name = "MOS_HARD")
    private Long mosHard;
    @Column(name = "NO_MOSHARD")
    private Long noMoshard;
    @Column(name = "NEV01")
    private Long nev01;
    @Column(name = "NEV02")
    private Long nev02;
    @Column(name = "NEV03")
    private Long nev03;
    @Column(name = "P_NEV01")
    private Long pNev01;
    @Column(name = "P_NEV02")
    private Long pNev02;
    @Column(name = "P_NEV03")
    private Long pNev03;
    @Column(name = "D_NEV01")
    private Long dNev01;
    @Column(name = "D_NEV02")
    private Long dNev02;
    @Column(name = "D_NEV03")
    private Long dNev03;
    @Column(name = "NEVISAND")
    private Long nevisand;
    @Column(name = "ERSH_BIM")
    private Long ershBim;
    @Column(name = "ERSH_DAR")
    private Long ershDar;
    @Column(name = "BJANB1")
    private Long bjanb1;
    @Column(name = "BJANB2")
    private Long bjanb2;
    @Column(name = "BJANB3")
    private Long bjanb3;
    @Column(name = "ISSU10_BIM")
    private Long issu10Bim;
    @Column(name = "ISSU10_NO")
    private Long issu10No;
    @Column(name = "GHATY")
    private Character ghaty;
    @Column(name = "MADE66")
    private Long made66;
    @Column(name = "PSNT4")
    private Long psnt4;
    @Column(name = "PSNT5")
    private Long psnt5;
    @Column(name = "KPSNT5")
    private Long kpsnt5;
    @Column(name = "TPSNT5")
    private Long tpsnt5;
    @Column(name = "KPSNT6")
    private Long kpsnt6;
    @Column(name = "TPSNT6")
    private Long tpsnt6;
    @Column(name = "SOLD_BIM")
    private Long soldBim;
    @Column(name = "SOLD_GVH")
    private Long soldGvh;
    @Column(name = "SOLD_NO")
    private Long soldNo;
    @Column(name = "JANBB1")
    private Long janbb1;
    @Column(name = "JANBB2")
    private Long janbb2;
    @Column(name = "JANBDK")
    private Long janbdk;
    @Column(name = "JANBDB")
    private Long janbdb;
    @Column(name = "TJANBD")
    private Long tjanbd;
    @Column(name = "BJANBD")
    private Long bjanbd;
    @Column(name = "INSWRKDAY")
    private Long inswrkday;
    @Column(name = "INSWSH1")
    private Long inswsh1;
    @Column(name = "INSWSH2")
    private Long inswsh2;
    @Column(name = "INSWSH3")
    private Long inswsh3;
    @Column(name = "INSWSH4")
    private Long inswsh4;
    @Column(name = "INSWSHNEW")
    private Long inswshnew;
    @Column(name = "INSISU1")
    private Long insisu1;
    @Column(name = "INSISU2")
    private Long insisu2;
    @Column(name = "INSISU3")
    private Long insisu3;
    @Column(name = "INSCNTNOT")
    private Long inscntnot;
    @Column(name = "INSCNTONE")
    private Long inscntone;
    @Column(name = "INSCNTTWO")
    private Long inscnttwo;
    @Column(name = "INSCNTTRE")
    private Long inscnttre;
    @Column(name = "INSCNTREQ")
    private Long inscntreq;
    @Column(name = "INSTYP1")
    private Long instyp1;
    @Column(name = "INSTYP2")
    private Long instyp2;
    @Column(name = "INSTYP3")
    private Long instyp3;
    @Column(name = "INSTYP4")
    private Long instyp4;
    @Column(name = "INSPYM")
    private Long inspym;
    @Column(name = "INSNONA")
    private Long insnona;
    @Column(name = "NO_84")
    private Long no84;
    @Column(name = "P_NO_84")
    private Long pNo84;
    @Column(name = "NO_EJRA")
    private Integer noEjra;
    @Column(name = "NO_FAAL")
    private Integer noFaal;
    @Column(name = "MAKHTOM")
    private Integer makhtom;
    @Column(name = "KHAREJ")
    private Integer kharej;
    @Column(name = "KASRJ")
    private Integer kasrj;
    @Column(name = "NO_19")
    private Long no19;
    @Column(name = "NO_WSH07")
    private Long noWsh07;
    @Column(name = "C_01")
    private Long c01;
    @Column(name = "AMOUNT_01")
    private Long amount01;
    @Column(name = "C_02")
    private Long c02;
    @Column(name = "AMOUNT_02")
    private Long amount02;
    @Column(name = "C_04")
    private Long c04;
    @Column(name = "AMOUNT_04")
    private Long amount04;
    @Column(name = "C_07")
    private Long c07;
    @Column(name = "AMOUNT_07")
    private Long amount07;
    @Column(name = "C_08")
    private Long c08;
    @Column(name = "AMOUNT_08")
    private Long amount08;
    @Column(name = "C_16")
    private Long c16;
    @Column(name = "AMOUNT_16")
    private Long amount16;
    @Column(name = "PAY_AZAD3")
    private Long payAzad3;
    @Column(name = "D_MAD01")
    private Long dMad01;
    @Column(name = "D_MAD02")
    private Long dMad02;
    @Column(name = "D_MAD03")
    private Long dMad03;
    @Column(name = "P_MAD01")
    private Long pMad01;
    @Column(name = "P_MAD02")
    private Long pMad02;
    @Column(name = "P_MAD03")
    private Long pMad03;
    @Column(name = "MAD12")
    private Long mad12;
    @Column(name = "MAD14")
    private Long mad14;
    @Column(name = "MAD18")
    private Long mad18;
    @Column(name = "KPAY_AZAD1")
    private Long kpayAzad1;
    @Column(name = "JANB17")
    private Long janb17;
    @Column(name = "JANB18")
    private Long janb18;
    @Column(name = "MOSTJ17")
    private Long mostj17;
    @Column(name = "MOSTJ18")
    private Long mostj18;
    @Column(name = "JANB81")
    private Long janb81;
    @Column(name = "JANB82")
    private Long janb82;
    @Column(name = "JANB83")
    private Long janb83;
    @Column(name = "JANB84")
    private Long janb84;
    @Column(name = "JANB85")
    private Long janb85;
    @Column(name = "JANB86")
    private Long janb86;
    @Column(name = "EKH15")
    private Long ekh15;
    @Column(name = "P_EKH15")
    private Long pEkh15;
    @Column(name = "D_EKH15")
    private Long dEkh15;
    @Column(name = "BDRIVE_B")
    private Long bdriveB;
    @Column(name = "DRIVE_B")
    private Long driveB;
    @Column(name = "KDRIVE_S")
    private Long kdriveS;
    @Column(name = "BDRIVE_S")
    private Long bdriveS;
    @Column(name = "DRIVE_S")
    private Long driveS;
    @Column(name = "KDRIVE_D")
    private Long kdriveD;
    @Column(name = "BDRIVE_D")
    private Long bdriveD;
    @Column(name = "DRIVE_D")
    private Long driveD;
    @Column(name = "DDRIVE_B")
    private Long ddriveB;
    @Column(name = "DDRIVE_S")
    private Long ddriveS;
    @Column(name = "DDRIVE_D")
    private Long ddriveD;
    @Column(name = "MOST10")
    private Long most10;
    @Column(name = "KHADEM")
    private Long khadem;
    @Column(name = "KHADEM_D")
    private Long khademD;
    @Column(name = "KHADEM_K")
    private Long khademK;
    @Column(name = "KHADEM_B")
    private Long khademB;
    @Column(name = "KDRIVE_B")
    private Long kdriveB;
    @Column(name = "P_SHD01")
    private Long pShd01;
    @Column(name = "P_SHD03")
    private Long pShd03;
    @Column(name = "P_SHD02")
    private Long pShd02;
    @Column(name = "D_SHD01")
    private Long dShd01;
    @Column(name = "D_SHD02")
    private Long dShd02;
    @Column(name = "D_SHD03")
    private Long dShd03;
    @Column(name = "SHD12")
    private Long shd12;
    @Column(name = "SHD14")
    private Long shd14;
    @Column(name = "SHD18")
    private Long shd18;
    @Column(name = "PAY_SHD")
    private Long payShd;
    @Column(name = "TRANSK")
    private Long transk;
    @Column(name = "TRANS")
    private Long trans;
    @Column(name = "TRANSK_D")
    private Long transkD;
    @Column(name = "TRANSK_B")
    private Long transkB;
    @Column(name = "TRANSK_K")
    private Long transkK;
    @Column(name = "TRANS_D")
    private Long transD;
    @Column(name = "TRANS_B")
    private Long transB;
    @Column(name = "TRANS_K")
    private Long transK;
    @Column(name = "MOST87")
    private Long most87;
    @Column(name = "MOSTD87")
    private Long mostd87;
    @Column(name = "MOSTMD87")
    private Long mostmd87;
    @Column(name = "TTRANS")
    private Long ttrans;
    @Column(name = "TRAN_BIM")
    private Long tranBim;
    @Column(name = "TRAN_D")
    private Long tranD;
    @Column(name = "MOSTDB87")
    private Long mostdb87;
    @Column(name = "MOSTB87")
    private Long mostb87;
    @Column(name = "NIMOSHR")
    private Long nimoshr;
    @Column(name = "NNIMOSHR")
    private Long nnimoshr;
    @Column(name = "PSNT7")
    private Long psnt7;
    @Column(name = "KPSNT7")
    private Long kpsnt7;
    @Column(name = "TPSNT7")
    private Long tpsnt7;
    @Column(name = "LASTDBT")
    private Integer lastdbt;
    @Column(name = "CURDBT")
    private Integer curdbt;
    @Column(name = "PERMET")
    private Integer permet;
    @Column(name = "CURMET")
    private Integer curmet;
    @Column(name = "CNTCMF")
    private Integer cntcmf;
    @Column(name = "CNTCNL")
    private Integer cntcnl;
    @Column(name = "GHARAR")
    private Integer gharar;
    @Column(name = "TAJDBT")
    private Integer tajdbt;
    @Column(name = "BADVWAIT")
    private Integer badvwait;
    @Column(name = "VOTEWAIT")
    private Integer votewait;
    @Column(name = "BADVGHARAR")
    private Integer badvgharar;
    @Column(name = "BADVCALC")
    private Integer badvcalc;
    @Column(name = "TAJDWAIT")
    private Integer tajdwait;
    @Column(name = "TAJDGHARAR")
    private Integer tajdgharar;
    @Column(name = "TAJDCALC")
    private Integer tajdcalc;
    @Column(name = "BLD_KT")
    private Long bldKt;
    @Column(name = "BLD_SZ")
    private Long bldSz;
    @Column(name = "BLD_MHR")
    private Long bldMhr;
    @Column(name = "BLD_MT")
    private Long bldMt;
    @Column(name = "BLD_RST")
    private Long bldRst;
    @Column(name = "NBLD_KT")
    private Integer nbldKt;
    @Column(name = "NBLD_SZ")
    private Integer nbldSz;
    @Column(name = "NBLD_MHR")
    private Integer nbldMhr;
    @Column(name = "NBLD_MT")
    private Integer nbldMt;
    @Column(name = "NBLD_RST")
    private Integer nbldRst;
    @Column(name = "BAZ_ERFAGHP")
    private Integer bazErfaghp;
    @Column(name = "BIM_ERFAGHP")
    private Integer bimErfaghp;
    @Column(name = "BLD_BIM")
    private Long bldBim;
    @Column(name = "BLD_BIMGVH")
    private Long bldBimgvh;
    @Column(name = "BLD_BIMNO")
    private Long bldBimno;
    @Column(name = "NMADE66")
    private Long nmade66;
    @Column(name = "HAND_BIM1")
    private Long handBim1;
    @Column(name = "HAND_BIMNO")
    private Long handBimno;
    @Column(name = "HAND_BIMGVH")
    private Long handBimgvh;
    @Column(name = "HAND_BIM2")
    private Long handBim2;
    @Column(name = "AZAD12")
    private Long azad12;
    @Column(name = "AZAD14")
    private Long azad14;
    @Column(name = "AZAD18")
    private Long azad18;
    @Column(name = "EKHN")
    private Long ekhn;
    @Column(name = "AZAD12_NO")
    private Long azad12No;
    @Column(name = "AZAD14_NO")
    private Long azad14No;
    @Column(name = "AZAD18_NO")
    private Long azad18No;
    @Column(name = "EKHN_NO")
    private Long ekhnNo;
    @Column(name = "BIM605_NO")
    private Long bim605No;
    @Column(name = "BIM605")
    private Long bim605;
    @Column(name = "ELAMIYE")
    private Long elamiye;
    @Column(name = "NO_ELAMIYE")
    private Long noElamiye;
    @Column(name = "PSNT8")
    private Long psnt8;
    @Column(name = "KPSNT8")
    private Long kpsnt8;
    @Column(name = "TPSNT8")
    private Long tpsnt8;
    @Column(name = "KPSNT9")
    private Long kpsnt9;
    @Column(name = "TPSNT9")
    private Long tpsnt9;
    @Column(name = "PSNT10")
    private Long psnt10;
    @Column(name = "KPSNT10")
    private Long kpsnt10;
    @Column(name = "TPSNT10")
    private Long tpsnt10;
    @Column(name = "KPSNT11")
    private Long kpsnt11;
    @Column(name = "TPSNT11")
    private Long tpsnt11;
    @Column(name = "KPSNT12")
    private Long kpsnt12;
    @Column(name = "TPSNT12")
    private Long tpsnt12;
    @Column(name = "PSNT9")
    private Long psnt9;
    @Column(name = "PSNT11")
    private Long psnt11;
    @Column(name = "PSNT12")
    private Long psnt12;
    @Column(name = "DDRIVE_B1")
    private Long ddriveB1;
    @Column(name = "DDRIVE_B2")
    private Long ddriveB2;
    @Column(name = "DDRIVE_S1")
    private Long ddriveS1;
    @Column(name = "DDRIVE_S2")
    private Long ddriveS2;
    @Column(name = "DDRIVE_D1")
    private Long ddriveD1;
    @Column(name = "DDRIVE_D2")
    private Long ddriveD2;
    @Column(name = "BDRIVE_B1")
    private Long bdriveB1;
    @Column(name = "BDRIVE_B2")
    private Long bdriveB2;
    @Column(name = "BDRIVE_B3")
    private Long bdriveB3;
    @Column(name = "BDRIVE_S1")
    private Long bdriveS1;
    @Column(name = "BDRIVE_S2")
    private Long bdriveS2;
    @Column(name = "BDRIVE_S3")
    private Long bdriveS3;
    @Column(name = "BDRIVE_D1")
    private Long bdriveD1;
    @Column(name = "BDRIVE_D2")
    private Long bdriveD2;
    @Column(name = "BDRIVE_D3")
    private Long bdriveD3;
    @Column(name = "N_MOST10")
    private Long nMost10;
    @Column(name = "NBEHZIST")
    private Long nbehzist;
    @Column(name = "KBEHZIST")
    private Long kbehzist;
    @Column(name = "GOVBEHZIST")
    private Long govbehzist;
    @Column(name = "KOM_SAR12")
    private Long komSar12;
    @Column(name = "KOM_SAR14")
    private Long komSar14;
    @Column(name = "KOM_SAR18")
    private Long komSar18;
    @Column(name = "KOM_MAD12")
    private Long komMad12;
    @Column(name = "KOM_MAD14")
    private Long komMad14;
    @Column(name = "KOM_MAD18")
    private Long komMad18;
    @Column(name = "BEH_SAR12")
    private Long behSar12;
    @Column(name = "BEH_SAR14")
    private Long behSar14;
    @Column(name = "BEH_SAR18")
    private Long behSar18;
    @Column(name = "BEH_MAD12")
    private Long behMad12;
    @Column(name = "BEH_MAD14")
    private Long behMad14;
    @Column(name = "BEH_MAD18")
    private Long behMad18;
    @Column(name = "MAHD_M12")
    private Long mahdM12;
    @Column(name = "MAHD_M14")
    private Long mahdM14;
    @Column(name = "MAHD_M18")
    private Long mahdM18;
    @Column(name = "NKOM_SAR12")
    private Long nkomSar12;
    @Column(name = "NKOM_SAR14")
    private Long nkomSar14;
    @Column(name = "NKOM_SAR18")
    private Long nkomSar18;
    @Column(name = "NKOM_MAD12")
    private Long nkomMad12;
    @Column(name = "NKOM_MAD14")
    private Long nkomMad14;
    @Column(name = "NKOM_MAD18")
    private Long nkomMad18;
    @Column(name = "NBEH_SAR12")
    private Long nbehSar12;
    @Column(name = "NBEH_SAR14")
    private Long nbehSar14;
    @Column(name = "NBEH_SAR18")
    private Long nbehSar18;
    @Column(name = "NBEH_MAD12")
    private Long nbehMad12;
    @Column(name = "NBEH_MAD14")
    private Long nbehMad14;
    @Column(name = "NBEH_MAD18")
    private Long nbehMad18;
    @Column(name = "NMAHD_M12")
    private Long nmahdM12;
    @Column(name = "NMAHD_M14")
    private Long nmahdM14;
    @Column(name = "NMAHD_M18")
    private Long nmahdM18;
    @Column(name = "HADAF_37")
    private Long hadaf37;
    @Column(name = "NBEHZIST1")
    private Long nbehzist1;
    @Column(name = "KBEHZIST1")
    private Long kbehzist1;
    @Column(name = "GOVBEHZIST1")
    private Long govbehzist1;
    @Column(name = "KGOVBEHZIST")
    private Long kgovbehzist;
    @Column(name = "KGOVBEHZIST1")
    private Long kgovbehzist1;
    @Column(name = "ESARAT_AZADD")
    private Long esaratAzadd;
    @Column(name = "JANG_JANBD")
    private Long jangJanbd;
    @Column(name = "ESARAT_D")
    private Long esaratD;
    @Column(name = "AZADEGAN_D")
    private Long azadeganD;
    @Column(name = "JANG_JANBD3")
    private Long jangJanbd3;
    @Column(name = "ESARAT_AZADK")
    private Long esaratAzadk;
    @Column(name = "JANG_JANBK")
    private Long jangJanbk;
    @Column(name = "JANG_JANBK3")
    private Long jangJanbk3;
    @Column(name = "NESARAT_AZADD")
    private Long nesaratAzadd;
    @Column(name = "NJANG_JANBD")
    private Long njangJanbd;
    @Column(name = "NESARAT_D")
    private Long nesaratD;
    @Column(name = "NAZADEGAN_D")
    private Long nazadeganD;
    @Column(name = "NJANG_JANBD3")
    private Long njangJanbd3;
    @Column(name = "NESARAT_AZADK")
    private Long nesaratAzadk;
    @Column(name = "NJANG_JANBK")
    private Long njangJanbk;
    @Column(name = "NJANG_JANBK3")
    private Long njangJanbk3;
    @Column(name = "MOST_56")
    private Long most56;
    @Column(name = "NMOST_56")
    private Long nmost56;
    @Column(name = "SAYADAN")
    private Long sayadan;
    @Column(name = "ZANBORDARAN")
    private Long zanbordaran;
    @Column(name = "NSAYAD")
    private Long nsayad;
    @Column(name = "NZANBOR")
    private Long nzanbor;
    @Column(name = "KOMAKZANBOR")
    private Long komakzanbor;
    @Column(name = "KOMAKSAYAD")
    private Long komaksayad;
    @Column(name = "NKARFARMA1")
    private Long nkarfarma1;
    @Column(name = "KKARFARMA1")
    private Long kkarfarma1;
    @Column(name = "NKARFARMA2")
    private Long nkarfarma2;
    @Column(name = "KKARFARMA2")
    private Long kkarfarma2;
    @Column(name = "KGOVKARFARMA1")
    private Long kgovkarfarma1;
    @Column(name = "PSNT13")
    private Long psnt13;
    @Column(name = "TPSNT13")
    private Long tpsnt13;
    @Column(name = "KPSNT13")
    private Long kpsnt13;
    @Column(name = "TPSNT14")
    private Long tpsnt14;
    @Column(name = "KPSNT14")
    private Long kpsnt14;
    @Column(name = "PSNT14")
    private Long psnt14;
    @Column(name = "KKARFARMA3")
    private Long kkarfarma3;
    @Column(name = "NKARFARMA3")
    private Long nkarfarma3;
    @Column(name = "TEL")
    private Long tel;
    @Column(name = "ACC")
    private Long acc;
    @Column(name = "ACCRES")
    private Long accres;
    @Column(name = "REGINGO")
    private Long regingo;
    @Column(name = "REALPEOPLE")
    private Long realpeople;
    @Column(name = "LAWPEOPLE")
    private Long lawpeople;
    @Column(name = "EJRA")
    private Long ejra;
    @Column(name = "ASSIGN")
    private Long assign;
    @Column(name = "PERSON")
    private Long person;
    @Column(name = "STOCK")
    private Long stock;
    @Column(name = "GUARANTY")
    private Long guaranty;
    @Column(name = "AUCTION")
    private Long auction;
    @Column(name = "AMVAL")
    private Long amval;
    @Column(name = "ESTATE")
    private Long estate;
    @Column(name = "ACT")
    private Long act;
    @Column(name = "DOCTOR")
    private Long doctor;
    @Column(name = "CHKLAW")
    private Long chklaw;
    @Column(name = "REALINS")
    private Long realins;
    @Column(name = "LAWINS")
    private Long lawins;
    @Column(name = "EVALU")
    private Long evalu;
    @Column(name = "WARN")
    private Long warn;
    @Column(name = "PROCEED")
    private Long proceed;
    @Column(name = "CURN_BAKHSHODE")
    private Long curnBakhshode;
    @Column(name = "LAST_BAKHSHODE")
    private Long lastBakhshode;
    @Column(name = "CURN_BIKBAKHSHOD")
    private Long curnBikbakhshod;
    @Column(name = "LAST_BIKBAKHSHOD")
    private Long lastBikbakhshod;
    @Column(name = "JARIMEH_BAKHSHOD")
    private Long jarimehBakhshod;
    @Column(name = "BAKHSHODE")
    private Long bakhshode;
    @Column(name = "BAKHSHODKAR")
    private Long bakhshodkar;
    @Column(name = "NIMOSHR_PR")
    private Long nimoshrPr;
    @Column(name = "NNIMOSHR_PR")
    private Long nnimoshrPr;
    @Column(name = "MOST_56_4")
    private Long most564;
    @Column(name = "NMOST_56_4")
    private Long nmost564;
    @Column(name = "PNH12")
    private Long pnh12;
    @Column(name = "PNH14")
    private Long pnh14;
    @Column(name = "PNH18")
    private Long pnh18;
    @Column(name = "S_PNH12")
    private Long sPnh12;
    @Column(name = "S_PNH14")
    private Long sPnh14;
    @Column(name = "S_PNH18")
    private Long sPnh18;
    @Column(name = "K_PNH12")
    private Long kPnh12;
    @Column(name = "K_PNH14")
    private Long kPnh14;
    @Column(name = "K_PNH18")
    private Long kPnh18;
    @Column(name = "K_S_PNH12")
    private Long kSPnh12;
    @Column(name = "K_S_PNH14")
    private Long kSPnh14;
    @Column(name = "K_S_PNH18")
    private Long kSPnh18;
    @Column(name = "NO_PNH12")
    private Long noPnh12;
    @Column(name = "NO_PNH14")
    private Long noPnh14;
    @Column(name = "NO_PNH18")
    private Long noPnh18;
    @Column(name = "HESABRESI_V")
    private Long hesabresiV;
    @Column(name = "HESABRESI_V_NO")
    private Long hesabresiVNo;
    @Column(name = "CURN_BAKHSHODE_N")
    private Long curnBakhshodeN;
    @Column(name = "LAST_BAKHSHODE_N")
    private Long lastBakhshodeN;
    @Column(name = "CURN_BIKBAKHSHOD_N")
    private Long curnBikbakhshodN;
    @Column(name = "LAST_BIKBAKHSHOD_N")
    private Long lastBikbakhshodN;
    @Column(name = "JARIMEH_BAKHSHOD_N")
    private Long jarimehBakhshodN;
    @Column(name = "BAKHSHODE_N")
    private Long bakhshodeN;
    @Column(name = "BAKHSHODKAR_N")
    private Long bakhshodkarN;
    @Column(name = "NIMOSHR_PR_N")
    private Long nimoshrPrN;
    @Column(name = "NNIMOSHR_PR_N")
    private Long nnimoshrPrN;
    @Column(name = "NDARKHAST_BAKHSHODEH")
    private Long ndarkhastBakhshodeh;
    @Column(name = "INSWSH1_RS")
    private Long inswsh1Rs;
    @Column(name = "INSWSH2_RS")
    private Long inswsh2Rs;
    @Column(name = "INSWSH3_RS")
    private Long inswsh3Rs;
    @Column(name = "INSWSH4_RS")
    private Long inswsh4Rs;
    @Column(name = "INSWSH_TOTAL_RS")
    private Long inswshTotalRs;
    @Column(name = "MOST_65")
    private Long most65;
    @Column(name = "NMOST_65")
    private Long nmost65;
    @Column(name = "FUNDTMP_KAR")
    private Long fundtmpKar;
    @Column(name = "N_FUNDTMP_KAR")
    private Long nFundtmpKar;
    @Column(name = "CONFIRM_AMT")
    private Long confirmAmt;
    @Column(name = "N_CONFIRM_AMT")
    private Long nConfirmAmt;
    @Column(name = "REFUND_AMT")
    private Long refundAmt;
    @Column(name = "N_REFUND_AMT")
    private Long nRefundAmt;
    @Column(name = "CURKARFARMA")
    private Long curkarfarma;
    @Column(name = "CURDOLAT")
    private Long curdolat;
    @Column(name = "MOST100")
    private Long most100;
    @Column(name = "N_CURKARFARMA")
    private Long nCurkarfarma;
    @Column(name = "N_CURDOLAT")
    private Long nCurdolat;
    @Column(name = "N_MOST100")
    private Long nMost100;
    @Column(name = "HARD_AMT495")
    private Long hardAmt495;
    @Column(name = "HARD_MOST495")
    private Long hardMost495;
    @Column(name = "AMTBED")
    private Long amtbed;
    @Column(name = "AMTBEDM")
    private Long amtbedm;
    @Column(name = "IRAN_OUTER_14")
    private Long iranOuter14;
    @Column(name = "IRAN_OUTER_18")
    private Long iranOuter18;
    @Column(name = "IRAN_OUTER_DARMAN")
    private Long iranOuterDarman;
    @Column(name = "N_IRAN_OUTER_14")
    private Long nIranOuter14;
    @Column(name = "N_IRAN_OUTER_18")
    private Long nIranOuter18;
    @Column(name = "N_IRAN_OUTER_DARMAN")
    private Long nIranOuterDarman;
    @Column(name = "N_MOST18_94")
    private Long nMost1894;
    @Column(name = "MOST18_94")
    private Long most1894;
    @Column(name = "K_EN_KOSOR")
    private Long kEnKosor;
    @Column(name = "N_EN_KOSOR")
    private Long nEnKosor;
    @Column(name = "KAR_M_ROSTAII")
    private Long karMRostaii;
    @Column(name = "N_KAR_M_ROSTAII")
    private Long nKarMRostaii;
    @Column(name = "CONFIRM_AMT1")
    private Long confirmAmt1;
    @Column(name = "NOKHBE12")
    private Long nokhbe12;
    @Column(name = "NOKHBE14")
    private Long nokhbe14;
    @Column(name = "NOKHBE18")
    private Long nokhbe18;
    @Column(name = "N_NOKHBE12")
    private Long nNokhbe12;
    @Column(name = "N_NOKHBE14")
    private Long nNokhbe14;
    @Column(name = "N_NOKHBE18")
    private Long nNokhbe18;
    @Column(name = "RCS_CHQNO96")
    private Long rcsChqno96;
    @Column(name = "RCS_CHQAMT96")
    private Long rcsChqamt96;
    @Column(name = "V_VOSOLHESAB")
    private Long vVosolhesab;
    @Column(name = "V_CNTHESAB")
    private Long vCnthesab;
    @Column(name = "BAKHSHODEKAR_N_BEFORE")
    private Long bakhshodekarNBefore;
    @Column(name = "BAKHSHODEKAR_N_AFTER")
    private Long bakhshodekarNAfter;
    @Column(name = "BAKHSHODE_N_BEFORE")
    private Long bakhshodeNBefore;
    @Column(name = "BAKHSHODE_N_AFTER")
    private Long bakhshodeNAfter;
    @Column(name = "NIMOSHR_PR_AFTER")
    private Long nimoshrPrAfter;
    @Column(name = "NNIMOSHR_PR_AFTER")
    private Long nnimoshrPrAfter;
    @Column(name = "LAST_BIKBAKHSHOD_AFTER")
    private Long lastBikbakhshodAfter;
    @Column(name = "JARIMEH_BAKHSHOD_AFTER")
    private Long jarimehBakhshodAfter;
    @Column(name = "LAST_BAKHSHODE_AFTER")
    private Long lastBakhshodeAfter;
    @Column(name = "NNIMOSHR_PR_BEFORE")
    private Long nnimoshrPrBefore;
    @Column(name = "LAST_BIKBAKHSHOD_BEFORE")
    private Long lastBikbakhshodBefore;
    @Column(name = "JARIMEH_BAKHSHOD_BEFORE")
    private Long jarimehBakhshodBefore;
    @Column(name = "LAST_BAKHSHODE_BEFORE")
    private Long lastBakhshodeBefore;
    @Column(name = "NIMOSHR_PR_BEFORE")
    private Long nimoshrPrBefore;
    @Column(name = "NDARKHAST_BAKHSHODEH_BEFORE")
    private Long ndarkhastBakhshodehBefore;
    @Column(name = "NDARKHAST_BAKHSHODEH_AFTER")
    private Long ndarkhastBakhshodehAfter;
    @Column(name = "KMOSTJ17_N")
    private Long kmostj17N;
    @Column(name = "BMOSTJ17_N")
    private Long bmostj17N;
    @Column(name = "N_MOS_53")
    private Long nmos53;   
    @Column(name = "N_MOS46_1")
    private Long nmos461;
    @Column(name = "N_MOS46_2")
    private Long nmos462;
    @Column(name = "N_HARD_AMT495")
    private Long nhardAmt495;
    @Column(name = "N_HARD_MOST495")
    private Long nhardMost495;
    @Column(name = "N_FANI677")
    private Long nfani677;
    @Column(name = "N_EKH27")
    private Long nekh27;
    
    
//    @Column(name = "MOS46_1")
//    private Long mos461;
//    @Column(name = "BIM46_1")
//    private Long bim461;
//    @Column(name = "BIMK46_1")
//    private Long bimk461;
//    @Column(name = "BIMK46_2")
//    private Long bimk462;
//    @Column(name = "BIM46_2")
//    private Long bim462;
//    @Column(name = "MOS46_2")
//    private Long mos462;
//    @Column(name = "NSAYAD1")
//    private Long nsayas1;
//    @Column(name = "KSAYAD1")
//    private Long ksayas1;
//    @Column(name = "KGOVSAYAD1")
//    private Long kgovsayad1;
//    @Column(name = "GOVSAYAD1")
//    private Long govsayad1;
//    @Column(name = "MHLPMOSHAVEGH")
//    private Long mhlpmoshavegh;
//    @Column(name = "MKARMOSHAVEGH")
//    private Long mkarmoshavegh;
//    @Column(name = "MBIMMOSHAVEGH")
//    private Long mbimmoshavegh;
//    @Column(name = "BIMBILDING")
//    private Long bimbilding;
//    @Column(name = "BIMNATURE")
//    private Long bimnature;
//    @Column(name = "BIMEMDAD")
//    private Long bimemdad;
//    @Column(name = "N_BIMBILDING")
//    private Long nbimbilding;
//    @Column(name = "N_BIMNATURE")
//    private Long nbimnature;
//    @Column(name = "N_BIMEMDAD")
//    private Long nbimemdad;    
//    @Column(name = "MHLPKARVARZI")
//    private Long mhlpkarvarzi;
//    @Column(name = "MKARKARVARZI")
//    private Long mkarkarvarzi;
//    @Column(name = "MBIMKARVARZI")
//    private Long mbimkarvarzi;
//    @Column(name = "HAND_BIM3")
//    private Long handbim3;
//    @Column(name = "HAND_BIM3NO")
//    private Long handbim3no;
//    @Column(name = "HAND_BIM3GVH")
//    private Long handbim3gvh;
//    @Column(name = "KASB_BIM")
//    private Long kasbbim;
//    @Column(name = "KASB_BIMNO")
//    private Long kasbbimno;
//    @Column(name = "HOZE_BIM")
//    private Long hozebim;
//    @Column(name = "HOZE_BIMNO")
//    private Long hozebimno;
//    @Column(name = "PAYK_BIM")
//    private Long paykbim;
//    @Column(name = "PAYK_BIMNO")
//    private Long paykbimno;
//    @Column(name = "KADEM_BIM")
//    private Long kadembim;
//    @Column(name = "KADEM_BIMNO")
//    private Long kadembimno;
//    @Column(name = "KADEM_BIMGVH")
//    private Long kadembimgvh;
//    @Column(name = "ESAR_BIM")
//    private Long esarbim;
//    @Column(name = "ESAR_BIMNO")
//    private Long esarbimno;
//    @Column(name = "KHODRO_BIM")
//    private Long khodrobim;
//    @Column(name = "KHODRO_BIMNO")
//    private Long khodrobimno;
//    @Column(name = "MADAN_BIM")
//    private Long madanbim;
//    @Column(name = "MADAN_BIMNO")
//    private Long madanbimno;
//    @Column(name = "SAKHTEMAN_BIM")
//    private Long sakhtemanbim;    
//    @Column(name = "SAKHTEMAN_BIMNO")
//    private Long sakhtemanbimno;
//    @Column(name = "VOKALA_BIM")
//    private Long vokalabim;
//    @Column(name = "VOKALA_BIMNO")
//    private Long vokalabimno;
//    @Column(name = "KASRI_BIM")
//    private Long kasribim;
//    @Column(name = "KASRI_BIMNO")
//    private Long kasribimno;
//    @Column(name = "MOSTH_BIM")
//    private Long mosthbim;
//    @Column(name = "MOSTH_BIMNO")
//    private Long mosthbimno;
//    @Column(name = "MOSTM_BIM")
//    private Long mostmbim;
//    @Column(name = "MOSTM_BIMNO")
//    private Long mostmbimno;
//    @Column(name = "SMOSTH_BIM")
//    private Long smosthbim;
//    @Column(name = "SMOSTM_BIMNO")
//    private Long smostmbimno;
//    @Column(name = "SMOSTM_BIM")
//    private Long smostmbim;
//    @Column(name = "BAKHSHODEKAR_N_AFTER1400")
//    private Long bakhshodekarafter;
//    @Column(name = "BAKHSHODE_N_AFTER1400")
//    private Long bakhshodeafter;
//    @Column(name = "NNIMOSHR_PR_AFTER1400")
//    private Long nnimoshrafter;
//    @Column(name = "LAST_BIKBAKHSHOD_AFTER1400")
//    private Long lastbikbakhshodafter;
//    @Column(name = "JARIMEH_BAKHSHOD_AFTER1400")
//    private Long jarimehbakhshodafter;
//    @Column(name = "LAST_BAKHSHODE_AFTER1400")
//    private Long lastbakhshodeafter;
//    @Column(name = "NIMOSHR_PR_AFTER1400")
//    private Long nimoshrafter;
//    @Column(name = "GARDESH_BIM")
//    private Long gardeshbim;
//    @Column(name = "GARDESH_BIMNO")
//    private Long gardeshbimno;
//    @Column(name = "BRCH_CODE")
//    private Long brchcode;

//    public Long getBim461() {
//        return bim461;
//    }
//
//    public void setBim461(Long bim461) {
//        this.bim461 = bim461;
//    }
//
//    public Long getMos461() {
//        return mos461;
//    }
//
//    public void setMos461(Long mos461) {
//        this.mos461 = mos461;
//    }
//
//    public Long getBimk461() {
//        return bimk461;
//    }
//
//    public void setBimk461(Long bimk461) {
//        this.bimk461 = bimk461;
//    }
//
//    public Long getBimk462() {
//        return bimk462;
//    }
//
//    public void setBimk462(Long bimk462) {
//        this.bimk462 = bimk462;
//    }
//
//    public Long getBim462() {
//        return bim462;
//    }
//
//    public void setBim462(Long bim462) {
//        this.bim462 = bim462;
//    }
//
//    public Long getMos462() {
//        return mos462;
//    }
//
//    public void setMos462(Long mos462) {
//        this.mos462 = mos462;
//    }
//
//    public Long getNsayas1() {
//        return nsayas1;
//    }
//
//    public void setNsayas1(Long nsayas1) {
//        this.nsayas1 = nsayas1;
//    }
//
//    public Long getKsayas1() {
//        return ksayas1;
//    }
//
//    public void setKsayas1(Long ksayas1) {
//        this.ksayas1 = ksayas1;
//    }
//
//    public Long getKgovsayad1() {
//        return kgovsayad1;
//    }
//
//    public void setKgovsayad1(Long kgovsayad1) {
//        this.kgovsayad1 = kgovsayad1;
//    }
//
//    public Long getGovsayad1() {
//        return govsayad1;
//    }
//
//    public void setGovsayad1(Long govsayad1) {
//        this.govsayad1 = govsayad1;
//    }
//
//    public Long getMhlpmoshavegh() {
//        return mhlpmoshavegh;
//    }
//
//    public void setMhlpmoshavegh(Long mhlpmoshavegh) {
//        this.mhlpmoshavegh = mhlpmoshavegh;
//    }
//
//    public Long getMkarmoshavegh() {
//        return mkarmoshavegh;
//    }
//
//    public void setMkarmoshavegh(Long mkarmoshavegh) {
//        this.mkarmoshavegh = mkarmoshavegh;
//    }
//
//    public Long getMbimmoshavegh() {
//        return mbimmoshavegh;
//    }
//
//    public void setMbimmoshavegh(Long mbimmoshavegh) {
//        this.mbimmoshavegh = mbimmoshavegh;
//    }
//
//    public Long getBimbilding() {
//        return bimbilding;
//    }
//
//    public void setBimbilding(Long bimbilding) {
//        this.bimbilding = bimbilding;
//    }
//
//    public Long getBimnature() {
//        return bimnature;
//    }
//
//    public void setBimnature(Long bimnature) {
//        this.bimnature = bimnature;
//    }
//
//    public Long getBimemdad() {
//        return bimemdad;
//    }
//
//    public void setBimemdad(Long bimemdad) {
//        this.bimemdad = bimemdad;
//    }
//
//    public Long getNbimbilding() {
//        return nbimbilding;
//    }
//
//    public void setNbimbilding(Long nbimbilding) {
//        this.nbimbilding = nbimbilding;
//    }
//
//    public Long getNbimnature() {
//        return nbimnature;
//    }
//
//    public void setNbimnature(Long nbimnature) {
//        this.nbimnature = nbimnature;
//    }
//
//    public Long getNbimemdad() {
//        return nbimemdad;
//    }
//
//    public void setNbimemdad(Long nbimemdad) {
//        this.nbimemdad = nbimemdad;
//    }
//
//    public Long getMhlpkarvarzi() {
//        return mhlpkarvarzi;
//    }
//
//    public void setMhlpkarvarzi(Long mhlpkarvarzi) {
//        this.mhlpkarvarzi = mhlpkarvarzi;
//    }
//
//    public Long getMkarkarvarzi() {
//        return mkarkarvarzi;
//    }
//
//    public void setMkarkarvarzi(Long mkarkarvarzi) {
//        this.mkarkarvarzi = mkarkarvarzi;
//    }
//
//    public Long getMbimkarvarzi() {
//        return mbimkarvarzi;
//    }
//
//    public void setMbimkarvarzi(Long mbimkarvarzi) {
//        this.mbimkarvarzi = mbimkarvarzi;
//    }
//
//    public Long getHandbim3() {
//        return handbim3;
//    }
//
//    public void setHandbim3(Long handbim3) {
//        this.handbim3 = handbim3;
//    }
//
//    public Long getHandbim3no() {
//        return handbim3no;
//    }
//
//    public void setHandbim3no(Long handbim3no) {
//        this.handbim3no = handbim3no;
//    }
//
//    public Long getHandbim3gvh() {
//        return handbim3gvh;
//    }
//
//    public void setHandbim3gvh(Long handbim3gvh) {
//        this.handbim3gvh = handbim3gvh;
//    }
//
//    public Long getKasbbim() {
//        return kasbbim;
//    }
//
//    public void setKasbbim(Long kasbbim) {
//        this.kasbbim = kasbbim;
//    }
//
//    public Long getKasbbimno() {
//        return kasbbimno;
//    }
//
//    public void setKasbbimno(Long kasbbimno) {
//        this.kasbbimno = kasbbimno;
//    }
//
//    public Long getHozebim() {
//        return hozebim;
//    }
//
//    public void setHozebim(Long hozebim) {
//        this.hozebim = hozebim;
//    }
//
//    public Long getHozebimno() {
//        return hozebimno;
//    }
//
//    public void setHozebimno(Long hozebimno) {
//        this.hozebimno = hozebimno;
//    }
//
//    public Long getPaykbim() {
//        return paykbim;
//    }
//
//    public void setPaykbim(Long paykbim) {
//        this.paykbim = paykbim;
//    }
//
//    public Long getPaykbimno() {
//        return paykbimno;
//    }
//
//    public void setPaykbimno(Long paykbimno) {
//        this.paykbimno = paykbimno;
//    }
//
//    public Long getKadembim() {
//        return kadembim;
//    }
//
//    public void setKadembim(Long kadembim) {
//        this.kadembim = kadembim;
//    }
//
//    public Long getKadembimno() {
//        return kadembimno;
//    }
//
//    public void setKadembimno(Long kadembimno) {
//        this.kadembimno = kadembimno;
//    }
//
//    public Long getKadembimgvh() {
//        return kadembimgvh;
//    }
//
//    public void setKadembimgvh(Long kadembimgvh) {
//        this.kadembimgvh = kadembimgvh;
//    }
//
//    public Long getEsarbim() {
//        return esarbim;
//    }
//
//    public void setEsarbim(Long esarbim) {
//        this.esarbim = esarbim;
//    }
//
//    public Long getEsarbimno() {
//        return esarbimno;
//    }
//
//    public void setEsarbimno(Long esarbimno) {
//        this.esarbimno = esarbimno;
//    }
//
//    public Long getKhodrobim() {
//        return khodrobim;
//    }
//
//    public void setKhodrobim(Long khodrobim) {
//        this.khodrobim = khodrobim;
//    }
//
//    public Long getKhodrobimno() {
//        return khodrobimno;
//    }
//
//    public void setKhodrobimno(Long khodrobimno) {
//        this.khodrobimno = khodrobimno;
//    }
//
//    public Long getMadanbim() {
//        return madanbim;
//    }
//
//    public void setMadanbim(Long madanbim) {
//        this.madanbim = madanbim;
//    }
//
//    public Long getMadanbimno() {
//        return madanbimno;
//    }
//
//    public void setMadanbimno(Long madanbimno) {
//        this.madanbimno = madanbimno;
//    }
//
//    public Long getSakhtemanbim() {
//        return sakhtemanbim;
//    }
//
//    public void setSakhtemanbim(Long sakhtemanbim) {
//        this.sakhtemanbim = sakhtemanbim;
//    }
//
//    public Long getSakhtemanbimno() {
//        return sakhtemanbimno;
//    }
//
//    public void setSakhtemanbimno(Long sakhtemanbimno) {
//        this.sakhtemanbimno = sakhtemanbimno;
//    }
//
//    public Long getVokalabim() {
//        return vokalabim;
//    }
//
//    public void setVokalabim(Long vokalabim) {
//        this.vokalabim = vokalabim;
//    }
//
//    public Long getVokalabimno() {
//        return vokalabimno;
//    }
//
//    public void setVokalabimno(Long vokalabimno) {
//        this.vokalabimno = vokalabimno;
//    }
//
//    public Long getKasribim() {
//        return kasribim;
//    }
//
//    public void setKasribim(Long kasribim) {
//        this.kasribim = kasribim;
//    }
//
//    public Long getKasribimno() {
//        return kasribimno;
//    }
//
//    public void setKasribimno(Long kasribimno) {
//        this.kasribimno = kasribimno;
//    }
//
//    public Long getMosthbim() {
//        return mosthbim;
//    }
//
//    public void setMosthbim(Long mosthbim) {
//        this.mosthbim = mosthbim;
//    }
//
//    public Long getMosthbimno() {
//        return mosthbimno;
//    }
//
//    public void setMosthbimno(Long mosthbimno) {
//        this.mosthbimno = mosthbimno;
//    }
//
//    public Long getMostmbim() {
//        return mostmbim;
//    }
//
//    public void setMostmbim(Long mostmbim) {
//        this.mostmbim = mostmbim;
//    }
//
//    public Long getMostmbimno() {
//        return mostmbimno;
//    }
//
//    public void setMostmbimno(Long mostmbimno) {
//        this.mostmbimno = mostmbimno;
//    }
//
//    public Long getSmosthbim() {
//        return smosthbim;
//    }
//
//    public void setSmosthbim(Long smosthbim) {
//        this.smosthbim = smosthbim;
//    }
//
//    public Long getSmostmbimno() {
//        return smostmbimno;
//    }
//
//    public void setSmostmbimno(Long smostmbimno) {
//        this.smostmbimno = smostmbimno;
//    }
//
//    public Long getSmostmbim() {
//        return smostmbim;
//    }
//
//    public void setSmostmbim(Long smostmbim) {
//        this.smostmbim = smostmbim;
//    }
//
//    public Long getBakhshodekarafter() {
//        return bakhshodekarafter;
//    }
//
//    public void setBakhshodekarafter(Long bakhshodekarafter) {
//        this.bakhshodekarafter = bakhshodekarafter;
//    }
//
//    public Long getBakhshodeafter() {
//        return bakhshodeafter;
//    }
//
//    public void setBakhshodeafter(Long bakhshodeafter) {
//        this.bakhshodeafter = bakhshodeafter;
//    }
//
//    public Long getNnimoshrafter() {
//        return nnimoshrafter;
//    }
//
//    public void setNnimoshrafter(Long nnimoshrafter) {
//        this.nnimoshrafter = nnimoshrafter;
//    }
//
//    public Long getLastbikbakhshodafter() {
//        return lastbikbakhshodafter;
//    }
//
//    public void setLastbikbakhshodafter(Long lastbikbakhshodafter) {
//        this.lastbikbakhshodafter = lastbikbakhshodafter;
//    }
//
//    public Long getJarimehbakhshodafter() {
//        return jarimehbakhshodafter;
//    }
//
//    public void setJarimehbakhshodafter(Long jarimehbakhshodafter) {
//        this.jarimehbakhshodafter = jarimehbakhshodafter;
//    }
//
//    public Long getLastbakhshodeafter() {
//        return lastbakhshodeafter;
//    }
//
//    public void setLastbakhshodeafter(Long lastbakhshodeafter) {
//        this.lastbakhshodeafter = lastbakhshodeafter;
//    }
//
//    public Long getNimoshrafter() {
//        return nimoshrafter;
//    }
//
//    public void setNimoshrafter(Long nimoshrafter) {
//        this.nimoshrafter = nimoshrafter;
//    }
//
//    public Long getGardeshbim() {
//        return gardeshbim;
//    }
//
//    public void setGardeshbim(Long gardeshbim) {
//        this.gardeshbim = gardeshbim;
//    }
//
//    public Long getGardeshbimno() {
//        return gardeshbimno;
//    }
//
//    public void setGardeshbimno(Long gardeshbimno) {
//        this.gardeshbimno = gardeshbimno;
//    }
//
//    public Long getBrchcode() {
//        return brchcode;
//    }
//
//    public void setBrchcode(Long brchcode) {
//        this.brchcode = brchcode;
//    }
//    
//    

    public DrmdTelInfo() {
    }

    public DrmdTelInfo(DrmdTelInfoPK drmdTelInfoPK) {
        this.drmdTelInfoPK = drmdTelInfoPK;
    }

    public DrmdTelInfoPK getDrmdTelInfoPK() {
        return drmdTelInfoPK;
    }

    public void setDrmdTelInfoPK(DrmdTelInfoPK drmdTelInfoPK) {
        this.drmdTelInfoPK = drmdTelInfoPK;
    }

    public Long getRcvChk() {
        return rcvChk;
    }

    public void setRcvChk(Long rcvChk) {
        this.rcvChk = rcvChk;
    }

    public Long getRcvChkg() {
        return rcvChkg;
    }

    public void setRcvChkg(Long rcvChkg) {
        this.rcvChkg = rcvChkg;
    }

    public Long getRcvCas() {
        return rcvCas;
    }

    public void setRcvCas(Long rcvCas) {
        this.rcvCas = rcvCas;
    }

    public Long getRcvHav() {
        return rcvHav;
    }

    public void setRcvHav(Long rcvHav) {
        this.rcvHav = rcvHav;
    }

    public Long getPayBes() {
        return payBes;
    }

    public void setPayBes(Long payBes) {
        this.payBes = payBes;
    }

    public Long getRcvSad() {
        return rcvSad;
    }

    public void setRcvSad(Long rcvSad) {
        this.rcvSad = rcvSad;
    }

    public Long getPayShob() {
        return payShob;
    }

    public void setPayShob(Long payShob) {
        this.payShob = payShob;
    }

    public Long getRcvNash() {
        return rcvNash;
    }

    public void setRcvNash(Long rcvNash) {
        this.rcvNash = rcvNash;
    }

    public Long getCurnPym() {
        return curnPym;
    }

    public void setCurnPym(Long curnPym) {
        this.curnPym = curnPym;
    }

    public Long getLastPym() {
        return lastPym;
    }

    public void setLastPym(Long lastPym) {
        this.lastPym = lastPym;
    }

    public Long getCurnNpy() {
        return curnNpy;
    }

    public void setCurnNpy(Long curnNpy) {
        this.curnNpy = curnNpy;
    }

    public Long getLastNpy() {
        return lastNpy;
    }

    public void setLastNpy(Long lastNpy) {
        this.lastNpy = lastNpy;
    }

    public Long getDolat27() {
        return dolat27;
    }

    public void setDolat27(Long dolat27) {
        this.dolat27 = dolat27;
    }

    public Long getKamel18() {
        return kamel18;
    }

    public void setKamel18(Long kamel18) {
        this.kamel18 = kamel18;
    }

    public Long getDolat18() {
        return dolat18;
    }

    public void setDolat18(Long dolat18) {
        this.dolat18 = dolat18;
    }

    public Long getPayAzad() {
        return payAzad;
    }

    public void setPayAzad(Long payAzad) {
        this.payAzad = payAzad;
    }

    public Long getPayAzad1() {
        return payAzad1;
    }

    public void setPayAzad1(Long payAzad1) {
        this.payAzad1 = payAzad1;
    }

    public Long getTdarman() {
        return tdarman;
    }

    public void setTdarman(Long tdarman) {
        this.tdarman = tdarman;
    }

    public Long getPayRan() {
        return payRan;
    }

    public void setPayRan(Long payRan) {
        this.payRan = payRan;
    }

    public Long getPayRan1() {
        return payRan1;
    }

    public void setPayRan1(Long payRan1) {
        this.payRan1 = payRan1;
    }

    public Long getPayTrnzt() {
        return payTrnzt;
    }

    public void setPayTrnzt(Long payTrnzt) {
        this.payTrnzt = payTrnzt;
    }

    public Long getPayBld() {
        return payBld;
    }

    public void setPayBld(Long payBld) {
        this.payBld = payBld;
    }

    public Long getPayPasb() {
        return payPasb;
    }

    public void setPayPasb(Long payPasb) {
        this.payPasb = payPasb;
    }

    public Long getLastBik() {
        return lastBik;
    }

    public void setLastBik(Long lastBik) {
        this.lastBik = lastBik;
    }

    public Long getCurnBik() {
        return curnBik;
    }

    public void setCurnBik(Long curnBik) {
        this.curnBik = curnBik;
    }

    public Long getJarimeh() {
        return jarimeh;
    }

    public void setJarimeh(Long jarimeh) {
        this.jarimeh = jarimeh;
    }

    public Long getKhesarat() {
        return khesarat;
    }

    public void setKhesarat(Long khesarat) {
        this.khesarat = khesarat;
    }

    public Long getPsnt1() {
        return psnt1;
    }

    public void setPsnt1(Long psnt1) {
        this.psnt1 = psnt1;
    }

    public Long getPsnt2() {
        return psnt2;
    }

    public void setPsnt2(Long psnt2) {
        this.psnt2 = psnt2;
    }

    public Long getPsnt3() {
        return psnt3;
    }

    public void setPsnt3(Long psnt3) {
        this.psnt3 = psnt3;
    }

    public Long getJanb1() {
        return janb1;
    }

    public void setJanb1(Long janb1) {
        this.janb1 = janb1;
    }

    public Long getJanb2() {
        return janb2;
    }

    public void setJanb2(Long janb2) {
        this.janb2 = janb2;
    }

    public Long getAdy1() {
        return ady1;
    }

    public void setAdy1(Long ady1) {
        this.ady1 = ady1;
    }

    public Long getAdy2() {
        return ady2;
    }

    public void setAdy2(Long ady2) {
        this.ady2 = ady2;
    }

    public Long getkLhBn() {
        return kLhBn;
    }

    public void setkLhBn(Long kLhBn) {
        this.kLhBn = kLhBn;
    }

    public Long getsLhBn() {
        return sLhBn;
    }

    public void setsLhBn(Long sLhBn) {
        this.sLhBn = sLhBn;
    }

    public Long getkLhBh() {
        return kLhBh;
    }

    public void setkLhBh(Long kLhBh) {
        this.kLhBh = kLhBh;
    }

    public Long getsLhBh() {
        return sLhBh;
    }

    public void setsLhBh(Long sLhBh) {
        this.sLhBh = sLhBh;
    }

    public Long getsLnBh() {
        return sLnBh;
    }

    public void setsLnBh(Long sLnBh) {
        this.sLnBh = sLnBh;
    }

    public Long getK27K() {
        return k27K;
    }

    public void setK27K(Long k27K) {
        this.k27K = k27K;
    }

    public Long getT27K() {
        return t27K;
    }

    public void setT27K(Long t27K) {
        this.t27K = t27K;
    }

    public Long getK18K() {
        return k18K;
    }

    public void setK18K(Long k18K) {
        this.k18K = k18K;
    }

    public Long getT18K() {
        return t18K;
    }

    public void setT18K(Long t18K) {
        this.t18K = t18K;
    }

    public Long getK27D() {
        return k27D;
    }

    public void setK27D(Long k27D) {
        this.k27D = k27D;
    }

    public Long getT27D() {
        return t27D;
    }

    public void setT27D(Long t27D) {
        this.t27D = t27D;
    }

    public Long getK18D() {
        return k18D;
    }

    public void setK18D(Long k18D) {
        this.k18D = k18D;
    }

    public Long getT18D() {
        return t18D;
    }

    public void setT18D(Long t18D) {
        this.t18D = t18D;
    }

    public Long getK27M() {
        return k27M;
    }

    public void setK27M(Long k27M) {
        this.k27M = k27M;
    }

    public Long getT27M() {
        return t27M;
    }

    public void setT27M(Long t27M) {
        this.t27M = t27M;
    }

    public Long getK18M() {
        return k18M;
    }

    public void setK18M(Long k18M) {
        this.k18M = k18M;
    }

    public Long getT18M() {
        return t18M;
    }

    public void setT18M(Long t18M) {
        this.t18M = t18M;
    }

    public Long getK27Md() {
        return k27Md;
    }

    public void setK27Md(Long k27Md) {
        this.k27Md = k27Md;
    }

    public Long getT27Md() {
        return t27Md;
    }

    public void setT27Md(Long t27Md) {
        this.t27Md = t27Md;
    }

    public Long getK18Md() {
        return k18Md;
    }

    public void setK18Md(Long k18Md) {
        this.k18Md = k18Md;
    }

    public Long getT18Md() {
        return t18Md;
    }

    public void setT18Md(Long t18Md) {
        this.t18Md = t18Md;
    }

    public Long getEkh12() {
        return ekh12;
    }

    public void setEkh12(Long ekh12) {
        this.ekh12 = ekh12;
    }

    public Long getEkh14() {
        return ekh14;
    }

    public void setEkh14(Long ekh14) {
        this.ekh14 = ekh14;
    }

    public Long getEkh18() {
        return ekh18;
    }

    public void setEkh18(Long ekh18) {
        this.ekh18 = ekh18;
    }

    public Long getAzd12() {
        return azd12;
    }

    public void setAzd12(Long azd12) {
        this.azd12 = azd12;
    }

    public Long getAzd14() {
        return azd14;
    }

    public void setAzd14(Long azd14) {
        this.azd14 = azd14;
    }

    public Long getAzd18() {
        return azd18;
    }

    public void setAzd18(Long azd18) {
        this.azd18 = azd18;
    }

    public Long getNdarman() {
        return ndarman;
    }

    public void setNdarman(Long ndarman) {
        this.ndarman = ndarman;
    }

    public Long getTjanb1() {
        return tjanb1;
    }

    public void setTjanb1(Long tjanb1) {
        this.tjanb1 = tjanb1;
    }

    public Long getTjanb2() {
        return tjanb2;
    }

    public void setTjanb2(Long tjanb2) {
        this.tjanb2 = tjanb2;
    }

    public Long getTjanb3() {
        return tjanb3;
    }

    public void setTjanb3(Long tjanb3) {
        this.tjanb3 = tjanb3;
    }

    public Long getkNBik() {
        return kNBik;
    }

    public void setkNBik(Long kNBik) {
        this.kNBik = kNBik;
    }

    public Long getsNBik() {
        return sNBik;
    }

    public void setsNBik(Long sNBik) {
        this.sNBik = sNBik;
    }

    public Long getkHBik() {
        return kHBik;
    }

    public void setkHBik(Long kHBik) {
        this.kHBik = kHBik;
    }

    public Long getsHBik() {
        return sHBik;
    }

    public void setsHBik(Long sHBik) {
        this.sHBik = sHBik;
    }

    public Long getkNhBik() {
        return kNhBik;
    }

    public void setkNhBik(Long kNhBik) {
        this.kNhBik = kNhBik;
    }

    public Long getsNhBik() {
        return sNhBik;
    }

    public void setsNhBik(Long sNhBik) {
        this.sNhBik = sNhBik;
    }

    public Long getKpsnt1() {
        return kpsnt1;
    }

    public void setKpsnt1(Long kpsnt1) {
        this.kpsnt1 = kpsnt1;
    }

    public Long getTpsnt1() {
        return tpsnt1;
    }

    public void setTpsnt1(Long tpsnt1) {
        this.tpsnt1 = tpsnt1;
    }

    public Long getKpsnt2() {
        return kpsnt2;
    }

    public void setKpsnt2(Long kpsnt2) {
        this.kpsnt2 = kpsnt2;
    }

    public Long getTpsnt2() {
        return tpsnt2;
    }

    public void setTpsnt2(Long tpsnt2) {
        this.tpsnt2 = tpsnt2;
    }

    public Long getKpsnt3() {
        return kpsnt3;
    }

    public void setKpsnt3(Long kpsnt3) {
        this.kpsnt3 = kpsnt3;
    }

    public Long getTpsnt3() {
        return tpsnt3;
    }

    public void setTpsnt3(Long tpsnt3) {
        this.tpsnt3 = tpsnt3;
    }

    public Long getKpsnt4() {
        return kpsnt4;
    }

    public void setKpsnt4(Long kpsnt4) {
        this.kpsnt4 = kpsnt4;
    }

    public Long getTpsnt4() {
        return tpsnt4;
    }

    public void setTpsnt4(Long tpsnt4) {
        this.tpsnt4 = tpsnt4;
    }

    public Long getBarBar() {
        return barBar;
    }

    public void setBarBar(Long barBar) {
        this.barBar = barBar;
    }

    public Long getNpayRan() {
        return npayRan;
    }

    public void setNpayRan(Long npayRan) {
        this.npayRan = npayRan;
    }

    public Long getMosBar() {
        return mosBar;
    }

    public void setMosBar(Long mosBar) {
        this.mosBar = mosBar;
    }

    public Long getNpayRan1() {
        return npayRan1;
    }

    public void setNpayRan1(Long npayRan1) {
        this.npayRan1 = npayRan1;
    }

    public Long getBldMtr() {
        return bldMtr;
    }

    public void setBldMtr(Long bldMtr) {
        this.bldMtr = bldMtr;
    }

    public Long getNpayBld() {
        return npayBld;
    }

    public void setNpayBld(Long npayBld) {
        this.npayBld = npayBld;
    }

    public Long getNpayPasb() {
        return npayPasb;
    }

    public void setNpayPasb(Long npayPasb) {
        this.npayPasb = npayPasb;
    }

    public Long getChkRetm() {
        return chkRetm;
    }

    public void setChkRetm(Long chkRetm) {
        this.chkRetm = chkRetm;
    }

    public Long getChkRetn() {
        return chkRetn;
    }

    public void setChkRetn(Long chkRetn) {
        this.chkRetn = chkRetn;
    }

    public Long getnBimtemp() {
        return nBimtemp;
    }

    public void setnBimtemp(Long nBimtemp) {
        this.nBimtemp = nBimtemp;
    }

    public Long getnBimasli() {
        return nBimasli;
    }

    public void setnBimasli(Long nBimasli) {
        this.nBimasli = nBimasli;
    }

    public Long getpBld3() {
        return pBld3;
    }

    public void setpBld3(Long pBld3) {
        this.pBld3 = pBld3;
    }

    public Long getpBld4() {
        return pBld4;
    }

    public void setpBld4(Long pBld4) {
        this.pBld4 = pBld4;
    }

    public Long getpAzd01() {
        return pAzd01;
    }

    public void setpAzd01(Long pAzd01) {
        this.pAzd01 = pAzd01;
    }

    public Long getpAzd02() {
        return pAzd02;
    }

    public void setpAzd02(Long pAzd02) {
        this.pAzd02 = pAzd02;
    }

    public Long getpAzd03() {
        return pAzd03;
    }

    public void setpAzd03(Long pAzd03) {
        this.pAzd03 = pAzd03;
    }

    public Long getpEkh11() {
        return pEkh11;
    }

    public void setpEkh11(Long pEkh11) {
        this.pEkh11 = pEkh11;
    }

    public Long getpEkh12() {
        return pEkh12;
    }

    public void setpEkh12(Long pEkh12) {
        this.pEkh12 = pEkh12;
    }

    public Long getpEkh13() {
        return pEkh13;
    }

    public void setpEkh13(Long pEkh13) {
        this.pEkh13 = pEkh13;
    }

    public Long getdAzd01() {
        return dAzd01;
    }

    public void setdAzd01(Long dAzd01) {
        this.dAzd01 = dAzd01;
    }

    public Long getdAzd02() {
        return dAzd02;
    }

    public void setdAzd02(Long dAzd02) {
        this.dAzd02 = dAzd02;
    }

    public Long getdAzd03() {
        return dAzd03;
    }

    public void setdAzd03(Long dAzd03) {
        this.dAzd03 = dAzd03;
    }

    public Long getdEkh11() {
        return dEkh11;
    }

    public void setdEkh11(Long dEkh11) {
        this.dEkh11 = dEkh11;
    }

    public Long getdEkh12() {
        return dEkh12;
    }

    public void setdEkh12(Long dEkh12) {
        this.dEkh12 = dEkh12;
    }

    public Long getdEkh13() {
        return dEkh13;
    }

    public void setdEkh13(Long dEkh13) {
        this.dEkh13 = dEkh13;
    }

    public Long getNewRan() {
        return newRan;
    }

    public void setNewRan(Long newRan) {
        this.newRan = newRan;
    }

    public Long getNewRanjar() {
        return newRanjar;
    }

    public void setNewRanjar(Long newRanjar) {
        this.newRanjar = newRanjar;
    }

    public Long getNewBaf() {
        return newBaf;
    }

    public void setNewBaf(Long newBaf) {
        this.newBaf = newBaf;
    }

    public Long getBafandeh() {
        return bafandeh;
    }

    public void setBafandeh(Long bafandeh) {
        this.bafandeh = bafandeh;
    }

    public Long getBafDlt() {
        return bafDlt;
    }

    public void setBafDlt(Long bafDlt) {
        this.bafDlt = bafDlt;
    }

    public Long getRanandeh() {
        return ranandeh;
    }

    public void setRanandeh(Long ranandeh) {
        this.ranandeh = ranandeh;
    }

    public Long getAtbig() {
        return atbig;
    }

    public void setAtbig(Long atbig) {
        this.atbig = atbig;
    }

    public Long getNoatbig() {
        return noatbig;
    }

    public void setNoatbig(Long noatbig) {
        this.noatbig = noatbig;
    }

    public Long getNokar() {
        return nokar;
    }

    public void setNokar(Long nokar) {
        this.nokar = nokar;
    }

    public Long getpEkh14() {
        return pEkh14;
    }

    public void setpEkh14(Long pEkh14) {
        this.pEkh14 = pEkh14;
    }

    public Long getdEkh14() {
        return dEkh14;
    }

    public void setdEkh14(Long dEkh14) {
        this.dEkh14 = dEkh14;
    }

    public Long getEkh21() {
        return ekh21;
    }

    public void setEkh21(Long ekh21) {
        this.ekh21 = ekh21;
    }

    public Long getPayHard() {
        return payHard;
    }

    public void setPayHard(Long payHard) {
        this.payHard = payHard;
    }

    public Long getNoHard() {
        return noHard;
    }

    public void setNoHard(Long noHard) {
        this.noHard = noHard;
    }

    public Long getKarHard() {
        return karHard;
    }

    public void setKarHard(Long karHard) {
        this.karHard = karHard;
    }

    public Long getMhlp49() {
        return mhlp49;
    }

    public void setMhlp49(Long mhlp49) {
        this.mhlp49 = mhlp49;
    }

    public Long getMkar49() {
        return mkar49;
    }

    public void setMkar49(Long mkar49) {
        this.mkar49 = mkar49;
    }

    public Long getMbim49() {
        return mbim49;
    }

    public void setMbim49(Long mbim49) {
        this.mbim49 = mbim49;
    }

    public Long getRanMin() {
        return ranMin;
    }

    public void setRanMin(Long ranMin) {
        this.ranMin = ranMin;
    }

    public Long getNoMin() {
        return noMin;
    }

    public void setNoMin(Long noMin) {
        this.noMin = noMin;
    }

    public Long getMosHard() {
        return mosHard;
    }

    public void setMosHard(Long mosHard) {
        this.mosHard = mosHard;
    }

    public Long getNoMoshard() {
        return noMoshard;
    }

    public void setNoMoshard(Long noMoshard) {
        this.noMoshard = noMoshard;
    }

    public Long getNev01() {
        return nev01;
    }

    public void setNev01(Long nev01) {
        this.nev01 = nev01;
    }

    public Long getNev02() {
        return nev02;
    }

    public void setNev02(Long nev02) {
        this.nev02 = nev02;
    }

    public Long getNev03() {
        return nev03;
    }

    public void setNev03(Long nev03) {
        this.nev03 = nev03;
    }

    public Long getpNev01() {
        return pNev01;
    }

    public void setpNev01(Long pNev01) {
        this.pNev01 = pNev01;
    }

    public Long getpNev02() {
        return pNev02;
    }

    public void setpNev02(Long pNev02) {
        this.pNev02 = pNev02;
    }

    public Long getpNev03() {
        return pNev03;
    }

    public void setpNev03(Long pNev03) {
        this.pNev03 = pNev03;
    }

    public Long getdNev01() {
        return dNev01;
    }

    public void setdNev01(Long dNev01) {
        this.dNev01 = dNev01;
    }

    public Long getdNev02() {
        return dNev02;
    }

    public void setdNev02(Long dNev02) {
        this.dNev02 = dNev02;
    }

    public Long getdNev03() {
        return dNev03;
    }

    public void setdNev03(Long dNev03) {
        this.dNev03 = dNev03;
    }

    public Long getNevisand() {
        return nevisand;
    }

    public void setNevisand(Long nevisand) {
        this.nevisand = nevisand;
    }

    public Long getErshBim() {
        return ershBim;
    }

    public void setErshBim(Long ershBim) {
        this.ershBim = ershBim;
    }

    public Long getErshDar() {
        return ershDar;
    }

    public void setErshDar(Long ershDar) {
        this.ershDar = ershDar;
    }

    public Long getBjanb1() {
        return bjanb1;
    }

    public void setBjanb1(Long bjanb1) {
        this.bjanb1 = bjanb1;
    }

    public Long getBjanb2() {
        return bjanb2;
    }

    public void setBjanb2(Long bjanb2) {
        this.bjanb2 = bjanb2;
    }

    public Long getBjanb3() {
        return bjanb3;
    }

    public void setBjanb3(Long bjanb3) {
        this.bjanb3 = bjanb3;
    }

    public Long getIssu10Bim() {
        return issu10Bim;
    }

    public void setIssu10Bim(Long issu10Bim) {
        this.issu10Bim = issu10Bim;
    }

    public Long getIssu10No() {
        return issu10No;
    }

    public void setIssu10No(Long issu10No) {
        this.issu10No = issu10No;
    }

    public Character getGhaty() {
        return ghaty;
    }

    public void setGhaty(Character ghaty) {
        this.ghaty = ghaty;
    }

    public Long getMade66() {
        return made66;
    }

    public void setMade66(Long made66) {
        this.made66 = made66;
    }

    public Long getPsnt4() {
        return psnt4;
    }

    public void setPsnt4(Long psnt4) {
        this.psnt4 = psnt4;
    }

    public Long getPsnt5() {
        return psnt5;
    }

    public void setPsnt5(Long psnt5) {
        this.psnt5 = psnt5;
    }

    public Long getKpsnt5() {
        return kpsnt5;
    }

    public void setKpsnt5(Long kpsnt5) {
        this.kpsnt5 = kpsnt5;
    }

    public Long getTpsnt5() {
        return tpsnt5;
    }

    public void setTpsnt5(Long tpsnt5) {
        this.tpsnt5 = tpsnt5;
    }

    public Long getKpsnt6() {
        return kpsnt6;
    }

    public void setKpsnt6(Long kpsnt6) {
        this.kpsnt6 = kpsnt6;
    }

    public Long getTpsnt6() {
        return tpsnt6;
    }

    public void setTpsnt6(Long tpsnt6) {
        this.tpsnt6 = tpsnt6;
    }

    public Long getSoldBim() {
        return soldBim;
    }

    public void setSoldBim(Long soldBim) {
        this.soldBim = soldBim;
    }

    public Long getSoldGvh() {
        return soldGvh;
    }

    public void setSoldGvh(Long soldGvh) {
        this.soldGvh = soldGvh;
    }

    public Long getSoldNo() {
        return soldNo;
    }

    public void setSoldNo(Long soldNo) {
        this.soldNo = soldNo;
    }

    public Long getJanbb1() {
        return janbb1;
    }

    public void setJanbb1(Long janbb1) {
        this.janbb1 = janbb1;
    }

    public Long getJanbb2() {
        return janbb2;
    }

    public void setJanbb2(Long janbb2) {
        this.janbb2 = janbb2;
    }

    public Long getJanbdk() {
        return janbdk;
    }

    public void setJanbdk(Long janbdk) {
        this.janbdk = janbdk;
    }

    public Long getJanbdb() {
        return janbdb;
    }

    public void setJanbdb(Long janbdb) {
        this.janbdb = janbdb;
    }

    public Long getTjanbd() {
        return tjanbd;
    }

    public void setTjanbd(Long tjanbd) {
        this.tjanbd = tjanbd;
    }

    public Long getBjanbd() {
        return bjanbd;
    }

    public void setBjanbd(Long bjanbd) {
        this.bjanbd = bjanbd;
    }

    public Long getInswrkday() {
        return inswrkday;
    }

    public void setInswrkday(Long inswrkday) {
        this.inswrkday = inswrkday;
    }

    public Long getInswsh1() {
        return inswsh1;
    }

    public void setInswsh1(Long inswsh1) {
        this.inswsh1 = inswsh1;
    }

    public Long getInswsh2() {
        return inswsh2;
    }

    public void setInswsh2(Long inswsh2) {
        this.inswsh2 = inswsh2;
    }

    public Long getInswsh3() {
        return inswsh3;
    }

    public void setInswsh3(Long inswsh3) {
        this.inswsh3 = inswsh3;
    }

    public Long getInswsh4() {
        return inswsh4;
    }

    public void setInswsh4(Long inswsh4) {
        this.inswsh4 = inswsh4;
    }

    public Long getInswshnew() {
        return inswshnew;
    }

    public void setInswshnew(Long inswshnew) {
        this.inswshnew = inswshnew;
    }

    public Long getInsisu1() {
        return insisu1;
    }

    public void setInsisu1(Long insisu1) {
        this.insisu1 = insisu1;
    }

    public Long getInsisu2() {
        return insisu2;
    }

    public void setInsisu2(Long insisu2) {
        this.insisu2 = insisu2;
    }

    public Long getInsisu3() {
        return insisu3;
    }

    public void setInsisu3(Long insisu3) {
        this.insisu3 = insisu3;
    }

    public Long getInscntnot() {
        return inscntnot;
    }

    public void setInscntnot(Long inscntnot) {
        this.inscntnot = inscntnot;
    }

    public Long getInscntone() {
        return inscntone;
    }

    public void setInscntone(Long inscntone) {
        this.inscntone = inscntone;
    }

    public Long getInscnttwo() {
        return inscnttwo;
    }

    public void setInscnttwo(Long inscnttwo) {
        this.inscnttwo = inscnttwo;
    }

    public Long getInscnttre() {
        return inscnttre;
    }

    public void setInscnttre(Long inscnttre) {
        this.inscnttre = inscnttre;
    }

    public Long getInscntreq() {
        return inscntreq;
    }

    public void setInscntreq(Long inscntreq) {
        this.inscntreq = inscntreq;
    }

    public Long getInstyp1() {
        return instyp1;
    }

    public void setInstyp1(Long instyp1) {
        this.instyp1 = instyp1;
    }

    public Long getInstyp2() {
        return instyp2;
    }

    public void setInstyp2(Long instyp2) {
        this.instyp2 = instyp2;
    }

    public Long getInstyp3() {
        return instyp3;
    }

    public void setInstyp3(Long instyp3) {
        this.instyp3 = instyp3;
    }

    public Long getInstyp4() {
        return instyp4;
    }

    public void setInstyp4(Long instyp4) {
        this.instyp4 = instyp4;
    }

    public Long getInspym() {
        return inspym;
    }

    public void setInspym(Long inspym) {
        this.inspym = inspym;
    }

    public Long getInsnona() {
        return insnona;
    }

    public void setInsnona(Long insnona) {
        this.insnona = insnona;
    }

    public Long getNo84() {
        return no84;
    }

    public void setNo84(Long no84) {
        this.no84 = no84;
    }

    public Long getpNo84() {
        return pNo84;
    }

    public void setpNo84(Long pNo84) {
        this.pNo84 = pNo84;
    }

    public Integer getNoEjra() {
        return noEjra;
    }

    public void setNoEjra(Integer noEjra) {
        this.noEjra = noEjra;
    }

    public Integer getNoFaal() {
        return noFaal;
    }

    public void setNoFaal(Integer noFaal) {
        this.noFaal = noFaal;
    }

    public Integer getMakhtom() {
        return makhtom;
    }

    public void setMakhtom(Integer makhtom) {
        this.makhtom = makhtom;
    }

    public Integer getKharej() {
        return kharej;
    }

    public void setKharej(Integer kharej) {
        this.kharej = kharej;
    }

    public Integer getKasrj() {
        return kasrj;
    }

    public void setKasrj(Integer kasrj) {
        this.kasrj = kasrj;
    }

    public Long getNo19() {
        return no19;
    }

    public void setNo19(Long no19) {
        this.no19 = no19;
    }

    public Long getNoWsh07() {
        return noWsh07;
    }

    public void setNoWsh07(Long noWsh07) {
        this.noWsh07 = noWsh07;
    }

    public Long getC01() {
        return c01;
    }

    public void setC01(Long c01) {
        this.c01 = c01;
    }

    public Long getAmount01() {
        return amount01;
    }

    public void setAmount01(Long amount01) {
        this.amount01 = amount01;
    }

    public Long getC02() {
        return c02;
    }

    public void setC02(Long c02) {
        this.c02 = c02;
    }

    public Long getAmount02() {
        return amount02;
    }

    public void setAmount02(Long amount02) {
        this.amount02 = amount02;
    }

    public Long getC04() {
        return c04;
    }

    public void setC04(Long c04) {
        this.c04 = c04;
    }

    public Long getAmount04() {
        return amount04;
    }

    public void setAmount04(Long amount04) {
        this.amount04 = amount04;
    }

    public Long getC07() {
        return c07;
    }

    public void setC07(Long c07) {
        this.c07 = c07;
    }

    public Long getAmount07() {
        return amount07;
    }

    public void setAmount07(Long amount07) {
        this.amount07 = amount07;
    }

    public Long getC08() {
        return c08;
    }

    public void setC08(Long c08) {
        this.c08 = c08;
    }

    public Long getAmount08() {
        return amount08;
    }

    public void setAmount08(Long amount08) {
        this.amount08 = amount08;
    }

    public Long getC16() {
        return c16;
    }

    public void setC16(Long c16) {
        this.c16 = c16;
    }

    public Long getAmount16() {
        return amount16;
    }

    public void setAmount16(Long amount16) {
        this.amount16 = amount16;
    }

    public Long getPayAzad3() {
        return payAzad3;
    }

    public void setPayAzad3(Long payAzad3) {
        this.payAzad3 = payAzad3;
    }

    public Long getdMad01() {
        return dMad01;
    }

    public void setdMad01(Long dMad01) {
        this.dMad01 = dMad01;
    }

    public Long getdMad02() {
        return dMad02;
    }

    public void setdMad02(Long dMad02) {
        this.dMad02 = dMad02;
    }

    public Long getdMad03() {
        return dMad03;
    }

    public void setdMad03(Long dMad03) {
        this.dMad03 = dMad03;
    }

    public Long getpMad01() {
        return pMad01;
    }

    public void setpMad01(Long pMad01) {
        this.pMad01 = pMad01;
    }

    public Long getpMad02() {
        return pMad02;
    }

    public void setpMad02(Long pMad02) {
        this.pMad02 = pMad02;
    }

    public Long getpMad03() {
        return pMad03;
    }

    public void setpMad03(Long pMad03) {
        this.pMad03 = pMad03;
    }

    public Long getMad12() {
        return mad12;
    }

    public void setMad12(Long mad12) {
        this.mad12 = mad12;
    }

    public Long getMad14() {
        return mad14;
    }

    public void setMad14(Long mad14) {
        this.mad14 = mad14;
    }

    public Long getMad18() {
        return mad18;
    }

    public void setMad18(Long mad18) {
        this.mad18 = mad18;
    }

    public Long getKpayAzad1() {
        return kpayAzad1;
    }

    public void setKpayAzad1(Long kpayAzad1) {
        this.kpayAzad1 = kpayAzad1;
    }

    public Long getJanb17() {
        return janb17;
    }

    public void setJanb17(Long janb17) {
        this.janb17 = janb17;
    }

    public Long getJanb18() {
        return janb18;
    }

    public void setJanb18(Long janb18) {
        this.janb18 = janb18;
    }

    public Long getMostj17() {
        return mostj17;
    }

    public void setMostj17(Long mostj17) {
        this.mostj17 = mostj17;
    }

    public Long getMostj18() {
        return mostj18;
    }

    public void setMostj18(Long mostj18) {
        this.mostj18 = mostj18;
    }

    public Long getJanb81() {
        return janb81;
    }

    public void setJanb81(Long janb81) {
        this.janb81 = janb81;
    }

    public Long getJanb82() {
        return janb82;
    }

    public void setJanb82(Long janb82) {
        this.janb82 = janb82;
    }

    public Long getJanb83() {
        return janb83;
    }

    public void setJanb83(Long janb83) {
        this.janb83 = janb83;
    }

    public Long getJanb84() {
        return janb84;
    }

    public void setJanb84(Long janb84) {
        this.janb84 = janb84;
    }

    public Long getJanb85() {
        return janb85;
    }

    public void setJanb85(Long janb85) {
        this.janb85 = janb85;
    }

    public Long getJanb86() {
        return janb86;
    }

    public void setJanb86(Long janb86) {
        this.janb86 = janb86;
    }

    public Long getEkh15() {
        return ekh15;
    }

    public void setEkh15(Long ekh15) {
        this.ekh15 = ekh15;
    }

    public Long getpEkh15() {
        return pEkh15;
    }

    public void setpEkh15(Long pEkh15) {
        this.pEkh15 = pEkh15;
    }

    public Long getdEkh15() {
        return dEkh15;
    }

    public void setdEkh15(Long dEkh15) {
        this.dEkh15 = dEkh15;
    }

    public Long getBdriveB() {
        return bdriveB;
    }

    public void setBdriveB(Long bdriveB) {
        this.bdriveB = bdriveB;
    }

    public Long getDriveB() {
        return driveB;
    }

    public void setDriveB(Long driveB) {
        this.driveB = driveB;
    }

    public Long getKdriveS() {
        return kdriveS;
    }

    public void setKdriveS(Long kdriveS) {
        this.kdriveS = kdriveS;
    }

    public Long getBdriveS() {
        return bdriveS;
    }

    public void setBdriveS(Long bdriveS) {
        this.bdriveS = bdriveS;
    }

    public Long getDriveS() {
        return driveS;
    }

    public void setDriveS(Long driveS) {
        this.driveS = driveS;
    }

    public Long getKdriveD() {
        return kdriveD;
    }

    public void setKdriveD(Long kdriveD) {
        this.kdriveD = kdriveD;
    }

    public Long getBdriveD() {
        return bdriveD;
    }

    public void setBdriveD(Long bdriveD) {
        this.bdriveD = bdriveD;
    }

    public Long getDriveD() {
        return driveD;
    }

    public void setDriveD(Long driveD) {
        this.driveD = driveD;
    }

    public Long getDdriveB() {
        return ddriveB;
    }

    public void setDdriveB(Long ddriveB) {
        this.ddriveB = ddriveB;
    }

    public Long getDdriveS() {
        return ddriveS;
    }

    public void setDdriveS(Long ddriveS) {
        this.ddriveS = ddriveS;
    }

    public Long getDdriveD() {
        return ddriveD;
    }

    public void setDdriveD(Long ddriveD) {
        this.ddriveD = ddriveD;
    }

    public Long getMost10() {
        return most10;
    }

    public void setMost10(Long most10) {
        this.most10 = most10;
    }

    public Long getKhadem() {
        return khadem;
    }

    public void setKhadem(Long khadem) {
        this.khadem = khadem;
    }

    public Long getKhademD() {
        return khademD;
    }

    public void setKhademD(Long khademD) {
        this.khademD = khademD;
    }

    public Long getKhademK() {
        return khademK;
    }

    public void setKhademK(Long khademK) {
        this.khademK = khademK;
    }

    public Long getKhademB() {
        return khademB;
    }

    public void setKhademB(Long khademB) {
        this.khademB = khademB;
    }

    public Long getKdriveB() {
        return kdriveB;
    }

    public void setKdriveB(Long kdriveB) {
        this.kdriveB = kdriveB;
    }

    public Long getpShd01() {
        return pShd01;
    }

    public void setpShd01(Long pShd01) {
        this.pShd01 = pShd01;
    }

    public Long getpShd03() {
        return pShd03;
    }

    public void setpShd03(Long pShd03) {
        this.pShd03 = pShd03;
    }

    public Long getpShd02() {
        return pShd02;
    }

    public void setpShd02(Long pShd02) {
        this.pShd02 = pShd02;
    }

    public Long getdShd01() {
        return dShd01;
    }

    public void setdShd01(Long dShd01) {
        this.dShd01 = dShd01;
    }

    public Long getdShd02() {
        return dShd02;
    }

    public void setdShd02(Long dShd02) {
        this.dShd02 = dShd02;
    }

    public Long getdShd03() {
        return dShd03;
    }

    public void setdShd03(Long dShd03) {
        this.dShd03 = dShd03;
    }

    public Long getShd12() {
        return shd12;
    }

    public void setShd12(Long shd12) {
        this.shd12 = shd12;
    }

    public Long getShd14() {
        return shd14;
    }

    public void setShd14(Long shd14) {
        this.shd14 = shd14;
    }

    public Long getShd18() {
        return shd18;
    }

    public void setShd18(Long shd18) {
        this.shd18 = shd18;
    }

    public Long getPayShd() {
        return payShd;
    }

    public void setPayShd(Long payShd) {
        this.payShd = payShd;
    }

    public Long getTransk() {
        return transk;
    }

    public void setTransk(Long transk) {
        this.transk = transk;
    }

    public Long getTrans() {
        return trans;
    }

    public void setTrans(Long trans) {
        this.trans = trans;
    }

    public Long getTranskD() {
        return transkD;
    }

    public void setTranskD(Long transkD) {
        this.transkD = transkD;
    }

    public Long getTranskB() {
        return transkB;
    }

    public void setTranskB(Long transkB) {
        this.transkB = transkB;
    }

    public Long getTranskK() {
        return transkK;
    }

    public void setTranskK(Long transkK) {
        this.transkK = transkK;
    }

    public Long getTransD() {
        return transD;
    }

    public void setTransD(Long transD) {
        this.transD = transD;
    }

    public Long getTransB() {
        return transB;
    }

    public void setTransB(Long transB) {
        this.transB = transB;
    }

    public Long getTransK() {
        return transK;
    }

    public void setTransK(Long transK) {
        this.transK = transK;
    }

    public Long getMost87() {
        return most87;
    }

    public void setMost87(Long most87) {
        this.most87 = most87;
    }

    public Long getMostd87() {
        return mostd87;
    }

    public void setMostd87(Long mostd87) {
        this.mostd87 = mostd87;
    }

    public Long getMostmd87() {
        return mostmd87;
    }

    public void setMostmd87(Long mostmd87) {
        this.mostmd87 = mostmd87;
    }

    public Long getTtrans() {
        return ttrans;
    }

    public void setTtrans(Long ttrans) {
        this.ttrans = ttrans;
    }

    public Long getTranBim() {
        return tranBim;
    }

    public void setTranBim(Long tranBim) {
        this.tranBim = tranBim;
    }

    public Long getTranD() {
        return tranD;
    }

    public void setTranD(Long tranD) {
        this.tranD = tranD;
    }

    public Long getMostdb87() {
        return mostdb87;
    }

    public void setMostdb87(Long mostdb87) {
        this.mostdb87 = mostdb87;
    }

    public Long getMostb87() {
        return mostb87;
    }

    public void setMostb87(Long mostb87) {
        this.mostb87 = mostb87;
    }

    public Long getNimoshr() {
        return nimoshr;
    }

    public void setNimoshr(Long nimoshr) {
        this.nimoshr = nimoshr;
    }

    public Long getNnimoshr() {
        return nnimoshr;
    }

    public void setNnimoshr(Long nnimoshr) {
        this.nnimoshr = nnimoshr;
    }

    public Long getPsnt7() {
        return psnt7;
    }

    public void setPsnt7(Long psnt7) {
        this.psnt7 = psnt7;
    }

    public Long getKpsnt7() {
        return kpsnt7;
    }

    public void setKpsnt7(Long kpsnt7) {
        this.kpsnt7 = kpsnt7;
    }

    public Long getTpsnt7() {
        return tpsnt7;
    }

    public void setTpsnt7(Long tpsnt7) {
        this.tpsnt7 = tpsnt7;
    }

    public Integer getLastdbt() {
        return lastdbt;
    }

    public void setLastdbt(Integer lastdbt) {
        this.lastdbt = lastdbt;
    }

    public Integer getCurdbt() {
        return curdbt;
    }

    public void setCurdbt(Integer curdbt) {
        this.curdbt = curdbt;
    }

    public Integer getPermet() {
        return permet;
    }

    public void setPermet(Integer permet) {
        this.permet = permet;
    }

    public Integer getCurmet() {
        return curmet;
    }

    public void setCurmet(Integer curmet) {
        this.curmet = curmet;
    }

    public Integer getCntcmf() {
        return cntcmf;
    }

    public void setCntcmf(Integer cntcmf) {
        this.cntcmf = cntcmf;
    }

    public Integer getCntcnl() {
        return cntcnl;
    }

    public void setCntcnl(Integer cntcnl) {
        this.cntcnl = cntcnl;
    }

    public Integer getGharar() {
        return gharar;
    }

    public void setGharar(Integer gharar) {
        this.gharar = gharar;
    }

    public Integer getTajdbt() {
        return tajdbt;
    }

    public void setTajdbt(Integer tajdbt) {
        this.tajdbt = tajdbt;
    }

    public Integer getBadvwait() {
        return badvwait;
    }

    public void setBadvwait(Integer badvwait) {
        this.badvwait = badvwait;
    }

    public Integer getVotewait() {
        return votewait;
    }

    public void setVotewait(Integer votewait) {
        this.votewait = votewait;
    }

    public Integer getBadvgharar() {
        return badvgharar;
    }

    public void setBadvgharar(Integer badvgharar) {
        this.badvgharar = badvgharar;
    }

    public Integer getBadvcalc() {
        return badvcalc;
    }

    public void setBadvcalc(Integer badvcalc) {
        this.badvcalc = badvcalc;
    }

    public Integer getTajdwait() {
        return tajdwait;
    }

    public void setTajdwait(Integer tajdwait) {
        this.tajdwait = tajdwait;
    }

    public Integer getTajdgharar() {
        return tajdgharar;
    }

    public void setTajdgharar(Integer tajdgharar) {
        this.tajdgharar = tajdgharar;
    }

    public Integer getTajdcalc() {
        return tajdcalc;
    }

    public void setTajdcalc(Integer tajdcalc) {
        this.tajdcalc = tajdcalc;
    }

    public Long getBldKt() {
        return bldKt;
    }

    public void setBldKt(Long bldKt) {
        this.bldKt = bldKt;
    }

    public Long getBldSz() {
        return bldSz;
    }

    public void setBldSz(Long bldSz) {
        this.bldSz = bldSz;
    }

    public Long getBldMhr() {
        return bldMhr;
    }

    public void setBldMhr(Long bldMhr) {
        this.bldMhr = bldMhr;
    }

    public Long getBldMt() {
        return bldMt;
    }

    public void setBldMt(Long bldMt) {
        this.bldMt = bldMt;
    }

    public Long getBldRst() {
        return bldRst;
    }

    public void setBldRst(Long bldRst) {
        this.bldRst = bldRst;
    }

    public Integer getNbldKt() {
        return nbldKt;
    }

    public void setNbldKt(Integer nbldKt) {
        this.nbldKt = nbldKt;
    }

    public Integer getNbldSz() {
        return nbldSz;
    }

    public void setNbldSz(Integer nbldSz) {
        this.nbldSz = nbldSz;
    }

    public Integer getNbldMhr() {
        return nbldMhr;
    }

    public void setNbldMhr(Integer nbldMhr) {
        this.nbldMhr = nbldMhr;
    }

    public Integer getNbldMt() {
        return nbldMt;
    }

    public void setNbldMt(Integer nbldMt) {
        this.nbldMt = nbldMt;
    }

    public Integer getNbldRst() {
        return nbldRst;
    }

    public void setNbldRst(Integer nbldRst) {
        this.nbldRst = nbldRst;
    }

    public Integer getBazErfaghp() {
        return bazErfaghp;
    }

    public void setBazErfaghp(Integer bazErfaghp) {
        this.bazErfaghp = bazErfaghp;
    }

    public Integer getBimErfaghp() {
        return bimErfaghp;
    }

    public void setBimErfaghp(Integer bimErfaghp) {
        this.bimErfaghp = bimErfaghp;
    }

    public Long getBldBim() {
        return bldBim;
    }

    public void setBldBim(Long bldBim) {
        this.bldBim = bldBim;
    }

    public Long getBldBimgvh() {
        return bldBimgvh;
    }

    public void setBldBimgvh(Long bldBimgvh) {
        this.bldBimgvh = bldBimgvh;
    }

    public Long getBldBimno() {
        return bldBimno;
    }

    public void setBldBimno(Long bldBimno) {
        this.bldBimno = bldBimno;
    }

    public Long getNmade66() {
        return nmade66;
    }

    public void setNmade66(Long nmade66) {
        this.nmade66 = nmade66;
    }

    public Long getHandBim1() {
        return handBim1;
    }

    public void setHandBim1(Long handBim1) {
        this.handBim1 = handBim1;
    }

    public Long getHandBimno() {
        return handBimno;
    }

    public void setHandBimno(Long handBimno) {
        this.handBimno = handBimno;
    }

    public Long getHandBimgvh() {
        return handBimgvh;
    }

    public void setHandBimgvh(Long handBimgvh) {
        this.handBimgvh = handBimgvh;
    }

    public Long getHandBim2() {
        return handBim2;
    }

    public void setHandBim2(Long handBim2) {
        this.handBim2 = handBim2;
    }

    public Long getAzad12() {
        return azad12;
    }

    public void setAzad12(Long azad12) {
        this.azad12 = azad12;
    }

    public Long getAzad14() {
        return azad14;
    }

    public void setAzad14(Long azad14) {
        this.azad14 = azad14;
    }

    public Long getAzad18() {
        return azad18;
    }

    public void setAzad18(Long azad18) {
        this.azad18 = azad18;
    }

    public Long getEkhn() {
        return ekhn;
    }

    public void setEkhn(Long ekhn) {
        this.ekhn = ekhn;
    }

    public Long getAzad12No() {
        return azad12No;
    }

    public void setAzad12No(Long azad12No) {
        this.azad12No = azad12No;
    }

    public Long getAzad14No() {
        return azad14No;
    }

    public void setAzad14No(Long azad14No) {
        this.azad14No = azad14No;
    }

    public Long getAzad18No() {
        return azad18No;
    }

    public void setAzad18No(Long azad18No) {
        this.azad18No = azad18No;
    }

    public Long getEkhnNo() {
        return ekhnNo;
    }

    public void setEkhnNo(Long ekhnNo) {
        this.ekhnNo = ekhnNo;
    }

    public Long getBim605No() {
        return bim605No;
    }

    public void setBim605No(Long bim605No) {
        this.bim605No = bim605No;
    }

    public Long getBim605() {
        return bim605;
    }

    public void setBim605(Long bim605) {
        this.bim605 = bim605;
    }

    public Long getElamiye() {
        return elamiye;
    }

    public void setElamiye(Long elamiye) {
        this.elamiye = elamiye;
    }

    public Long getNoElamiye() {
        return noElamiye;
    }

    public void setNoElamiye(Long noElamiye) {
        this.noElamiye = noElamiye;
    }

    public Long getPsnt8() {
        return psnt8;
    }

    public void setPsnt8(Long psnt8) {
        this.psnt8 = psnt8;
    }

    public Long getKpsnt8() {
        return kpsnt8;
    }

    public void setKpsnt8(Long kpsnt8) {
        this.kpsnt8 = kpsnt8;
    }

    public Long getTpsnt8() {
        return tpsnt8;
    }

    public void setTpsnt8(Long tpsnt8) {
        this.tpsnt8 = tpsnt8;
    }

    public Long getKpsnt9() {
        return kpsnt9;
    }

    public void setKpsnt9(Long kpsnt9) {
        this.kpsnt9 = kpsnt9;
    }

    public Long getTpsnt9() {
        return tpsnt9;
    }

    public void setTpsnt9(Long tpsnt9) {
        this.tpsnt9 = tpsnt9;
    }

    public Long getPsnt10() {
        return psnt10;
    }

    public void setPsnt10(Long psnt10) {
        this.psnt10 = psnt10;
    }

    public Long getKpsnt10() {
        return kpsnt10;
    }

    public void setKpsnt10(Long kpsnt10) {
        this.kpsnt10 = kpsnt10;
    }

    public Long getTpsnt10() {
        return tpsnt10;
    }

    public void setTpsnt10(Long tpsnt10) {
        this.tpsnt10 = tpsnt10;
    }

    public Long getKpsnt11() {
        return kpsnt11;
    }

    public void setKpsnt11(Long kpsnt11) {
        this.kpsnt11 = kpsnt11;
    }

    public Long getTpsnt11() {
        return tpsnt11;
    }

    public void setTpsnt11(Long tpsnt11) {
        this.tpsnt11 = tpsnt11;
    }

    public Long getKpsnt12() {
        return kpsnt12;
    }

    public void setKpsnt12(Long kpsnt12) {
        this.kpsnt12 = kpsnt12;
    }

    public Long getTpsnt12() {
        return tpsnt12;
    }

    public void setTpsnt12(Long tpsnt12) {
        this.tpsnt12 = tpsnt12;
    }

    public Long getPsnt9() {
        return psnt9;
    }

    public void setPsnt9(Long psnt9) {
        this.psnt9 = psnt9;
    }

    public Long getPsnt11() {
        return psnt11;
    }

    public void setPsnt11(Long psnt11) {
        this.psnt11 = psnt11;
    }

    public Long getPsnt12() {
        return psnt12;
    }

    public void setPsnt12(Long psnt12) {
        this.psnt12 = psnt12;
    }

    public Long getDdriveB1() {
        return ddriveB1;
    }

    public void setDdriveB1(Long ddriveB1) {
        this.ddriveB1 = ddriveB1;
    }

    public Long getDdriveB2() {
        return ddriveB2;
    }

    public void setDdriveB2(Long ddriveB2) {
        this.ddriveB2 = ddriveB2;
    }

    public Long getDdriveS1() {
        return ddriveS1;
    }

    public void setDdriveS1(Long ddriveS1) {
        this.ddriveS1 = ddriveS1;
    }

    public Long getDdriveS2() {
        return ddriveS2;
    }

    public void setDdriveS2(Long ddriveS2) {
        this.ddriveS2 = ddriveS2;
    }

    public Long getDdriveD1() {
        return ddriveD1;
    }

    public void setDdriveD1(Long ddriveD1) {
        this.ddriveD1 = ddriveD1;
    }

    public Long getDdriveD2() {
        return ddriveD2;
    }

    public void setDdriveD2(Long ddriveD2) {
        this.ddriveD2 = ddriveD2;
    }

    public Long getBdriveB1() {
        return bdriveB1;
    }

    public void setBdriveB1(Long bdriveB1) {
        this.bdriveB1 = bdriveB1;
    }

    public Long getBdriveB2() {
        return bdriveB2;
    }

    public void setBdriveB2(Long bdriveB2) {
        this.bdriveB2 = bdriveB2;
    }

    public Long getBdriveB3() {
        return bdriveB3;
    }

    public void setBdriveB3(Long bdriveB3) {
        this.bdriveB3 = bdriveB3;
    }

    public Long getBdriveS1() {
        return bdriveS1;
    }

    public void setBdriveS1(Long bdriveS1) {
        this.bdriveS1 = bdriveS1;
    }

    public Long getBdriveS2() {
        return bdriveS2;
    }

    public void setBdriveS2(Long bdriveS2) {
        this.bdriveS2 = bdriveS2;
    }

    public Long getBdriveS3() {
        return bdriveS3;
    }

    public void setBdriveS3(Long bdriveS3) {
        this.bdriveS3 = bdriveS3;
    }

    public Long getBdriveD1() {
        return bdriveD1;
    }

    public void setBdriveD1(Long bdriveD1) {
        this.bdriveD1 = bdriveD1;
    }

    public Long getBdriveD2() {
        return bdriveD2;
    }

    public void setBdriveD2(Long bdriveD2) {
        this.bdriveD2 = bdriveD2;
    }

    public Long getBdriveD3() {
        return bdriveD3;
    }

    public void setBdriveD3(Long bdriveD3) {
        this.bdriveD3 = bdriveD3;
    }

    public Long getnMost10() {
        return nMost10;
    }

    public void setnMost10(Long nMost10) {
        this.nMost10 = nMost10;
    }

    public Long getNbehzist() {
        return nbehzist;
    }

    public void setNbehzist(Long nbehzist) {
        this.nbehzist = nbehzist;
    }

    public Long getKbehzist() {
        return kbehzist;
    }

    public void setKbehzist(Long kbehzist) {
        this.kbehzist = kbehzist;
    }

    public Long getGovbehzist() {
        return govbehzist;
    }

    public void setGovbehzist(Long govbehzist) {
        this.govbehzist = govbehzist;
    }

    public Long getKomSar12() {
        return komSar12;
    }

    public void setKomSar12(Long komSar12) {
        this.komSar12 = komSar12;
    }

    public Long getKomSar14() {
        return komSar14;
    }

    public void setKomSar14(Long komSar14) {
        this.komSar14 = komSar14;
    }

    public Long getKomSar18() {
        return komSar18;
    }

    public void setKomSar18(Long komSar18) {
        this.komSar18 = komSar18;
    }

    public Long getKomMad12() {
        return komMad12;
    }

    public void setKomMad12(Long komMad12) {
        this.komMad12 = komMad12;
    }

    public Long getKomMad14() {
        return komMad14;
    }

    public void setKomMad14(Long komMad14) {
        this.komMad14 = komMad14;
    }

    public Long getKomMad18() {
        return komMad18;
    }

    public void setKomMad18(Long komMad18) {
        this.komMad18 = komMad18;
    }

    public Long getBehSar12() {
        return behSar12;
    }

    public void setBehSar12(Long behSar12) {
        this.behSar12 = behSar12;
    }

    public Long getBehSar14() {
        return behSar14;
    }

    public void setBehSar14(Long behSar14) {
        this.behSar14 = behSar14;
    }

    public Long getBehSar18() {
        return behSar18;
    }

    public void setBehSar18(Long behSar18) {
        this.behSar18 = behSar18;
    }

    public Long getBehMad12() {
        return behMad12;
    }

    public void setBehMad12(Long behMad12) {
        this.behMad12 = behMad12;
    }

    public Long getBehMad14() {
        return behMad14;
    }

    public void setBehMad14(Long behMad14) {
        this.behMad14 = behMad14;
    }

    public Long getBehMad18() {
        return behMad18;
    }

    public void setBehMad18(Long behMad18) {
        this.behMad18 = behMad18;
    }

    public Long getMahdM12() {
        return mahdM12;
    }

    public void setMahdM12(Long mahdM12) {
        this.mahdM12 = mahdM12;
    }

    public Long getMahdM14() {
        return mahdM14;
    }

    public void setMahdM14(Long mahdM14) {
        this.mahdM14 = mahdM14;
    }

    public Long getMahdM18() {
        return mahdM18;
    }

    public void setMahdM18(Long mahdM18) {
        this.mahdM18 = mahdM18;
    }

    public Long getNkomSar12() {
        return nkomSar12;
    }

    public void setNkomSar12(Long nkomSar12) {
        this.nkomSar12 = nkomSar12;
    }

    public Long getNkomSar14() {
        return nkomSar14;
    }

    public void setNkomSar14(Long nkomSar14) {
        this.nkomSar14 = nkomSar14;
    }

    public Long getNkomSar18() {
        return nkomSar18;
    }

    public void setNkomSar18(Long nkomSar18) {
        this.nkomSar18 = nkomSar18;
    }

    public Long getNkomMad12() {
        return nkomMad12;
    }

    public void setNkomMad12(Long nkomMad12) {
        this.nkomMad12 = nkomMad12;
    }

    public Long getNkomMad14() {
        return nkomMad14;
    }

    public void setNkomMad14(Long nkomMad14) {
        this.nkomMad14 = nkomMad14;
    }

    public Long getNkomMad18() {
        return nkomMad18;
    }

    public void setNkomMad18(Long nkomMad18) {
        this.nkomMad18 = nkomMad18;
    }

    public Long getNbehSar12() {
        return nbehSar12;
    }

    public void setNbehSar12(Long nbehSar12) {
        this.nbehSar12 = nbehSar12;
    }

    public Long getNbehSar14() {
        return nbehSar14;
    }

    public void setNbehSar14(Long nbehSar14) {
        this.nbehSar14 = nbehSar14;
    }

    public Long getNbehSar18() {
        return nbehSar18;
    }

    public void setNbehSar18(Long nbehSar18) {
        this.nbehSar18 = nbehSar18;
    }

    public Long getNbehMad12() {
        return nbehMad12;
    }

    public void setNbehMad12(Long nbehMad12) {
        this.nbehMad12 = nbehMad12;
    }

    public Long getNbehMad14() {
        return nbehMad14;
    }

    public void setNbehMad14(Long nbehMad14) {
        this.nbehMad14 = nbehMad14;
    }

    public Long getNbehMad18() {
        return nbehMad18;
    }

    public void setNbehMad18(Long nbehMad18) {
        this.nbehMad18 = nbehMad18;
    }

    public Long getNmahdM12() {
        return nmahdM12;
    }

    public void setNmahdM12(Long nmahdM12) {
        this.nmahdM12 = nmahdM12;
    }

    public Long getNmahdM14() {
        return nmahdM14;
    }

    public void setNmahdM14(Long nmahdM14) {
        this.nmahdM14 = nmahdM14;
    }

    public Long getNmahdM18() {
        return nmahdM18;
    }

    public void setNmahdM18(Long nmahdM18) {
        this.nmahdM18 = nmahdM18;
    }

    public Long getHadaf37() {
        return hadaf37;
    }

    public void setHadaf37(Long hadaf37) {
        this.hadaf37 = hadaf37;
    }

    public Long getNbehzist1() {
        return nbehzist1;
    }

    public void setNbehzist1(Long nbehzist1) {
        this.nbehzist1 = nbehzist1;
    }

    public Long getKbehzist1() {
        return kbehzist1;
    }

    public void setKbehzist1(Long kbehzist1) {
        this.kbehzist1 = kbehzist1;
    }

    public Long getGovbehzist1() {
        return govbehzist1;
    }

    public void setGovbehzist1(Long govbehzist1) {
        this.govbehzist1 = govbehzist1;
    }

    public Long getKgovbehzist() {
        return kgovbehzist;
    }

    public void setKgovbehzist(Long kgovbehzist) {
        this.kgovbehzist = kgovbehzist;
    }

    public Long getKgovbehzist1() {
        return kgovbehzist1;
    }

    public void setKgovbehzist1(Long kgovbehzist1) {
        this.kgovbehzist1 = kgovbehzist1;
    }

    public Long getEsaratAzadd() {
        return esaratAzadd;
    }

    public void setEsaratAzadd(Long esaratAzadd) {
        this.esaratAzadd = esaratAzadd;
    }

    public Long getJangJanbd() {
        return jangJanbd;
    }

    public void setJangJanbd(Long jangJanbd) {
        this.jangJanbd = jangJanbd;
    }

    public Long getEsaratD() {
        return esaratD;
    }

    public void setEsaratD(Long esaratD) {
        this.esaratD = esaratD;
    }

    public Long getAzadeganD() {
        return azadeganD;
    }

    public void setAzadeganD(Long azadeganD) {
        this.azadeganD = azadeganD;
    }

    public Long getJangJanbd3() {
        return jangJanbd3;
    }

    public void setJangJanbd3(Long jangJanbd3) {
        this.jangJanbd3 = jangJanbd3;
    }

    public Long getEsaratAzadk() {
        return esaratAzadk;
    }

    public void setEsaratAzadk(Long esaratAzadk) {
        this.esaratAzadk = esaratAzadk;
    }

    public Long getJangJanbk() {
        return jangJanbk;
    }

    public void setJangJanbk(Long jangJanbk) {
        this.jangJanbk = jangJanbk;
    }

    public Long getJangJanbk3() {
        return jangJanbk3;
    }

    public void setJangJanbk3(Long jangJanbk3) {
        this.jangJanbk3 = jangJanbk3;
    }

    public Long getNesaratAzadd() {
        return nesaratAzadd;
    }

    public void setNesaratAzadd(Long nesaratAzadd) {
        this.nesaratAzadd = nesaratAzadd;
    }

    public Long getNjangJanbd() {
        return njangJanbd;
    }

    public void setNjangJanbd(Long njangJanbd) {
        this.njangJanbd = njangJanbd;
    }

    public Long getNesaratD() {
        return nesaratD;
    }

    public void setNesaratD(Long nesaratD) {
        this.nesaratD = nesaratD;
    }

    public Long getNazadeganD() {
        return nazadeganD;
    }

    public void setNazadeganD(Long nazadeganD) {
        this.nazadeganD = nazadeganD;
    }

    public Long getNjangJanbd3() {
        return njangJanbd3;
    }

    public void setNjangJanbd3(Long njangJanbd3) {
        this.njangJanbd3 = njangJanbd3;
    }

    public Long getNesaratAzadk() {
        return nesaratAzadk;
    }

    public void setNesaratAzadk(Long nesaratAzadk) {
        this.nesaratAzadk = nesaratAzadk;
    }

    public Long getNjangJanbk() {
        return njangJanbk;
    }

    public void setNjangJanbk(Long njangJanbk) {
        this.njangJanbk = njangJanbk;
    }

    public Long getNjangJanbk3() {
        return njangJanbk3;
    }

    public void setNjangJanbk3(Long njangJanbk3) {
        this.njangJanbk3 = njangJanbk3;
    }

    public Long getMost56() {
        return most56;
    }

    public void setMost56(Long most56) {
        this.most56 = most56;
    }

    public Long getNmost56() {
        return nmost56;
    }

    public void setNmost56(Long nmost56) {
        this.nmost56 = nmost56;
    }

    public Long getSayadan() {
        return sayadan;
    }

    public void setSayadan(Long sayadan) {
        this.sayadan = sayadan;
    }

    public Long getZanbordaran() {
        return zanbordaran;
    }

    public void setZanbordaran(Long zanbordaran) {
        this.zanbordaran = zanbordaran;
    }

    public Long getNsayad() {
        return nsayad;
    }

    public void setNsayad(Long nsayad) {
        this.nsayad = nsayad;
    }

    public Long getNzanbor() {
        return nzanbor;
    }

    public void setNzanbor(Long nzanbor) {
        this.nzanbor = nzanbor;
    }

    public Long getKomakzanbor() {
        return komakzanbor;
    }

    public void setKomakzanbor(Long komakzanbor) {
        this.komakzanbor = komakzanbor;
    }

    public Long getKomaksayad() {
        return komaksayad;
    }

    public void setKomaksayad(Long komaksayad) {
        this.komaksayad = komaksayad;
    }

    public Long getNkarfarma1() {
        return nkarfarma1;
    }

    public void setNkarfarma1(Long nkarfarma1) {
        this.nkarfarma1 = nkarfarma1;
    }

    public Long getKkarfarma1() {
        return kkarfarma1;
    }

    public void setKkarfarma1(Long kkarfarma1) {
        this.kkarfarma1 = kkarfarma1;
    }

    public Long getNkarfarma2() {
        return nkarfarma2;
    }

    public void setNkarfarma2(Long nkarfarma2) {
        this.nkarfarma2 = nkarfarma2;
    }

    public Long getKkarfarma2() {
        return kkarfarma2;
    }

    public void setKkarfarma2(Long kkarfarma2) {
        this.kkarfarma2 = kkarfarma2;
    }

    public Long getKgovkarfarma1() {
        return kgovkarfarma1;
    }

    public void setKgovkarfarma1(Long kgovkarfarma1) {
        this.kgovkarfarma1 = kgovkarfarma1;
    }

    public Long getPsnt13() {
        return psnt13;
    }

    public void setPsnt13(Long psnt13) {
        this.psnt13 = psnt13;
    }

    public Long getTpsnt13() {
        return tpsnt13;
    }

    public void setTpsnt13(Long tpsnt13) {
        this.tpsnt13 = tpsnt13;
    }

    public Long getKpsnt13() {
        return kpsnt13;
    }

    public void setKpsnt13(Long kpsnt13) {
        this.kpsnt13 = kpsnt13;
    }

    public Long getTpsnt14() {
        return tpsnt14;
    }

    public void setTpsnt14(Long tpsnt14) {
        this.tpsnt14 = tpsnt14;
    }

    public Long getKpsnt14() {
        return kpsnt14;
    }

    public void setKpsnt14(Long kpsnt14) {
        this.kpsnt14 = kpsnt14;
    }

    public Long getPsnt14() {
        return psnt14;
    }

    public void setPsnt14(Long psnt14) {
        this.psnt14 = psnt14;
    }

    public Long getKkarfarma3() {
        return kkarfarma3;
    }

    public void setKkarfarma3(Long kkarfarma3) {
        this.kkarfarma3 = kkarfarma3;
    }

    public Long getNkarfarma3() {
        return nkarfarma3;
    }

    public void setNkarfarma3(Long nkarfarma3) {
        this.nkarfarma3 = nkarfarma3;
    }

    public Long getTel() {
        return tel;
    }

    public void setTel(Long tel) {
        this.tel = tel;
    }

    public Long getAcc() {
        return acc;
    }

    public void setAcc(Long acc) {
        this.acc = acc;
    }

    public Long getAccres() {
        return accres;
    }

    public void setAccres(Long accres) {
        this.accres = accres;
    }

    public Long getRegingo() {
        return regingo;
    }

    public void setRegingo(Long regingo) {
        this.regingo = regingo;
    }

    public Long getRealpeople() {
        return realpeople;
    }

    public void setRealpeople(Long realpeople) {
        this.realpeople = realpeople;
    }

    public Long getLawpeople() {
        return lawpeople;
    }

    public void setLawpeople(Long lawpeople) {
        this.lawpeople = lawpeople;
    }

    public Long getEjra() {
        return ejra;
    }

    public void setEjra(Long ejra) {
        this.ejra = ejra;
    }

    public Long getAssign() {
        return assign;
    }

    public void setAssign(Long assign) {
        this.assign = assign;
    }

    public Long getPerson() {
        return person;
    }

    public void setPerson(Long person) {
        this.person = person;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public Long getGuaranty() {
        return guaranty;
    }

    public void setGuaranty(Long guaranty) {
        this.guaranty = guaranty;
    }

    public Long getAuction() {
        return auction;
    }

    public void setAuction(Long auction) {
        this.auction = auction;
    }

    public Long getAmval() {
        return amval;
    }

    public void setAmval(Long amval) {
        this.amval = amval;
    }

    public Long getEstate() {
        return estate;
    }

    public void setEstate(Long estate) {
        this.estate = estate;
    }

    public Long getAct() {
        return act;
    }

    public void setAct(Long act) {
        this.act = act;
    }

    public Long getDoctor() {
        return doctor;
    }

    public void setDoctor(Long doctor) {
        this.doctor = doctor;
    }

    public Long getChklaw() {
        return chklaw;
    }

    public void setChklaw(Long chklaw) {
        this.chklaw = chklaw;
    }

    public Long getRealins() {
        return realins;
    }

    public void setRealins(Long realins) {
        this.realins = realins;
    }

    public Long getLawins() {
        return lawins;
    }

    public void setLawins(Long lawins) {
        this.lawins = lawins;
    }

    public Long getEvalu() {
        return evalu;
    }

    public void setEvalu(Long evalu) {
        this.evalu = evalu;
    }

    public Long getWarn() {
        return warn;
    }

    public void setWarn(Long warn) {
        this.warn = warn;
    }

    public Long getProceed() {
        return proceed;
    }

    public void setProceed(Long proceed) {
        this.proceed = proceed;
    }

    public Long getCurnBakhshode() {
        return curnBakhshode;
    }

    public void setCurnBakhshode(Long curnBakhshode) {
        this.curnBakhshode = curnBakhshode;
    }

    public Long getLastBakhshode() {
        return lastBakhshode;
    }

    public void setLastBakhshode(Long lastBakhshode) {
        this.lastBakhshode = lastBakhshode;
    }

    public Long getCurnBikbakhshod() {
        return curnBikbakhshod;
    }

    public void setCurnBikbakhshod(Long curnBikbakhshod) {
        this.curnBikbakhshod = curnBikbakhshod;
    }

    public Long getLastBikbakhshod() {
        return lastBikbakhshod;
    }

    public void setLastBikbakhshod(Long lastBikbakhshod) {
        this.lastBikbakhshod = lastBikbakhshod;
    }

    public Long getJarimehBakhshod() {
        return jarimehBakhshod;
    }

    public void setJarimehBakhshod(Long jarimehBakhshod) {
        this.jarimehBakhshod = jarimehBakhshod;
    }

    public Long getBakhshode() {
        return bakhshode;
    }

    public void setBakhshode(Long bakhshode) {
        this.bakhshode = bakhshode;
    }

    public Long getBakhshodkar() {
        return bakhshodkar;
    }

    public void setBakhshodkar(Long bakhshodkar) {
        this.bakhshodkar = bakhshodkar;
    }

    public Long getNimoshrPr() {
        return nimoshrPr;
    }

    public void setNimoshrPr(Long nimoshrPr) {
        this.nimoshrPr = nimoshrPr;
    }

    public Long getNnimoshrPr() {
        return nnimoshrPr;
    }

    public void setNnimoshrPr(Long nnimoshrPr) {
        this.nnimoshrPr = nnimoshrPr;
    }

    public Long getMost564() {
        return most564;
    }

    public void setMost564(Long most564) {
        this.most564 = most564;
    }

    public Long getNmost564() {
        return nmost564;
    }

    public void setNmost564(Long nmost564) {
        this.nmost564 = nmost564;
    }

    public Long getPnh12() {
        return pnh12;
    }

    public void setPnh12(Long pnh12) {
        this.pnh12 = pnh12;
    }

    public Long getPnh14() {
        return pnh14;
    }

    public void setPnh14(Long pnh14) {
        this.pnh14 = pnh14;
    }

    public Long getPnh18() {
        return pnh18;
    }

    public void setPnh18(Long pnh18) {
        this.pnh18 = pnh18;
    }

    public Long getsPnh12() {
        return sPnh12;
    }

    public void setsPnh12(Long sPnh12) {
        this.sPnh12 = sPnh12;
    }

    public Long getsPnh14() {
        return sPnh14;
    }

    public void setsPnh14(Long sPnh14) {
        this.sPnh14 = sPnh14;
    }

    public Long getsPnh18() {
        return sPnh18;
    }

    public void setsPnh18(Long sPnh18) {
        this.sPnh18 = sPnh18;
    }

    public Long getkPnh12() {
        return kPnh12;
    }

    public void setkPnh12(Long kPnh12) {
        this.kPnh12 = kPnh12;
    }

    public Long getkPnh14() {
        return kPnh14;
    }

    public void setkPnh14(Long kPnh14) {
        this.kPnh14 = kPnh14;
    }

    public Long getkPnh18() {
        return kPnh18;
    }

    public void setkPnh18(Long kPnh18) {
        this.kPnh18 = kPnh18;
    }

    public Long getkSPnh12() {
        return kSPnh12;
    }

    public void setkSPnh12(Long kSPnh12) {
        this.kSPnh12 = kSPnh12;
    }

    public Long getkSPnh14() {
        return kSPnh14;
    }

    public void setkSPnh14(Long kSPnh14) {
        this.kSPnh14 = kSPnh14;
    }

    public Long getkSPnh18() {
        return kSPnh18;
    }

    public void setkSPnh18(Long kSPnh18) {
        this.kSPnh18 = kSPnh18;
    }

    public Long getNoPnh12() {
        return noPnh12;
    }

    public void setNoPnh12(Long noPnh12) {
        this.noPnh12 = noPnh12;
    }

    public Long getNoPnh14() {
        return noPnh14;
    }

    public void setNoPnh14(Long noPnh14) {
        this.noPnh14 = noPnh14;
    }

    public Long getNoPnh18() {
        return noPnh18;
    }

    public void setNoPnh18(Long noPnh18) {
        this.noPnh18 = noPnh18;
    }

    public Long getHesabresiV() {
        return hesabresiV;
    }

    public void setHesabresiV(Long hesabresiV) {
        this.hesabresiV = hesabresiV;
    }

    public Long getHesabresiVNo() {
        return hesabresiVNo;
    }

    public void setHesabresiVNo(Long hesabresiVNo) {
        this.hesabresiVNo = hesabresiVNo;
    }

    public Long getCurnBakhshodeN() {
        return curnBakhshodeN;
    }

    public void setCurnBakhshodeN(Long curnBakhshodeN) {
        this.curnBakhshodeN = curnBakhshodeN;
    }

    public Long getLastBakhshodeN() {
        return lastBakhshodeN;
    }

    public void setLastBakhshodeN(Long lastBakhshodeN) {
        this.lastBakhshodeN = lastBakhshodeN;
    }

    public Long getCurnBikbakhshodN() {
        return curnBikbakhshodN;
    }

    public void setCurnBikbakhshodN(Long curnBikbakhshodN) {
        this.curnBikbakhshodN = curnBikbakhshodN;
    }

    public Long getLastBikbakhshodN() {
        return lastBikbakhshodN;
    }

    public void setLastBikbakhshodN(Long lastBikbakhshodN) {
        this.lastBikbakhshodN = lastBikbakhshodN;
    }

    public Long getJarimehBakhshodN() {
        return jarimehBakhshodN;
    }

    public void setJarimehBakhshodN(Long jarimehBakhshodN) {
        this.jarimehBakhshodN = jarimehBakhshodN;
    }

    public Long getBakhshodeN() {
        return bakhshodeN;
    }

    public void setBakhshodeN(Long bakhshodeN) {
        this.bakhshodeN = bakhshodeN;
    }

    public Long getBakhshodkarN() {
        return bakhshodkarN;
    }

    public void setBakhshodkarN(Long bakhshodkarN) {
        this.bakhshodkarN = bakhshodkarN;
    }

    public Long getNimoshrPrN() {
        return nimoshrPrN;
    }

    public void setNimoshrPrN(Long nimoshrPrN) {
        this.nimoshrPrN = nimoshrPrN;
    }

    public Long getNnimoshrPrN() {
        return nnimoshrPrN;
    }

    public void setNnimoshrPrN(Long nnimoshrPrN) {
        this.nnimoshrPrN = nnimoshrPrN;
    }

    public Long getNdarkhastBakhshodeh() {
        return ndarkhastBakhshodeh;
    }

    public void setNdarkhastBakhshodeh(Long ndarkhastBakhshodeh) {
        this.ndarkhastBakhshodeh = ndarkhastBakhshodeh;
    }

    public Long getInswsh1Rs() {
        return inswsh1Rs;
    }

    public void setInswsh1Rs(Long inswsh1Rs) {
        this.inswsh1Rs = inswsh1Rs;
    }

    public Long getInswsh2Rs() {
        return inswsh2Rs;
    }

    public void setInswsh2Rs(Long inswsh2Rs) {
        this.inswsh2Rs = inswsh2Rs;
    }

    public Long getInswsh3Rs() {
        return inswsh3Rs;
    }

    public void setInswsh3Rs(Long inswsh3Rs) {
        this.inswsh3Rs = inswsh3Rs;
    }

    public Long getInswsh4Rs() {
        return inswsh4Rs;
    }

    public void setInswsh4Rs(Long inswsh4Rs) {
        this.inswsh4Rs = inswsh4Rs;
    }

    public Long getInswshTotalRs() {
        return inswshTotalRs;
    }

    public void setInswshTotalRs(Long inswshTotalRs) {
        this.inswshTotalRs = inswshTotalRs;
    }

    public Long getMost65() {
        return most65;
    }

    public void setMost65(Long most65) {
        this.most65 = most65;
    }

    public Long getNmost65() {
        return nmost65;
    }

    public void setNmost65(Long nmost65) {
        this.nmost65 = nmost65;
    }

    public Long getFundtmpKar() {
        return fundtmpKar;
    }

    public void setFundtmpKar(Long fundtmpKar) {
        this.fundtmpKar = fundtmpKar;
    }

    public Long getnFundtmpKar() {
        return nFundtmpKar;
    }

    public void setnFundtmpKar(Long nFundtmpKar) {
        this.nFundtmpKar = nFundtmpKar;
    }

    public Long getConfirmAmt() {
        return confirmAmt;
    }

    public void setConfirmAmt(Long confirmAmt) {
        this.confirmAmt = confirmAmt;
    }

    public Long getnConfirmAmt() {
        return nConfirmAmt;
    }

    public void setnConfirmAmt(Long nConfirmAmt) {
        this.nConfirmAmt = nConfirmAmt;
    }

    public Long getRefundAmt() {
        return refundAmt;
    }

    public void setRefundAmt(Long refundAmt) {
        this.refundAmt = refundAmt;
    }

    public Long getnRefundAmt() {
        return nRefundAmt;
    }

    public void setnRefundAmt(Long nRefundAmt) {
        this.nRefundAmt = nRefundAmt;
    }

    public Long getCurkarfarma() {
        return curkarfarma;
    }

    public void setCurkarfarma(Long curkarfarma) {
        this.curkarfarma = curkarfarma;
    }

    public Long getCurdolat() {
        return curdolat;
    }

    public void setCurdolat(Long curdolat) {
        this.curdolat = curdolat;
    }

    public Long getMost100() {
        return most100;
    }

    public void setMost100(Long most100) {
        this.most100 = most100;
    }

    public Long getnCurkarfarma() {
        return nCurkarfarma;
    }

    public void setnCurkarfarma(Long nCurkarfarma) {
        this.nCurkarfarma = nCurkarfarma;
    }

    public Long getnCurdolat() {
        return nCurdolat;
    }

    public void setnCurdolat(Long nCurdolat) {
        this.nCurdolat = nCurdolat;
    }

    public Long getnMost100() {
        return nMost100;
    }

    public void setnMost100(Long nMost100) {
        this.nMost100 = nMost100;
    }

    public Long getHardAmt495() {
        return hardAmt495;
    }

    public void setHardAmt495(Long hardAmt495) {
        this.hardAmt495 = hardAmt495;
    }

    public Long getHardMost495() {
        return hardMost495;
    }

    public void setHardMost495(Long hardMost495) {
        this.hardMost495 = hardMost495;
    }

    public Long getAmtbed() {
        return amtbed;
    }

    public void setAmtbed(Long amtbed) {
        this.amtbed = amtbed;
    }

    public Long getAmtbedm() {
        return amtbedm;
    }

    public void setAmtbedm(Long amtbedm) {
        this.amtbedm = amtbedm;
    }

    public Long getIranOuter14() {
        return iranOuter14;
    }

    public void setIranOuter14(Long iranOuter14) {
        this.iranOuter14 = iranOuter14;
    }

    public Long getIranOuter18() {
        return iranOuter18;
    }

    public void setIranOuter18(Long iranOuter18) {
        this.iranOuter18 = iranOuter18;
    }

    public Long getIranOuterDarman() {
        return iranOuterDarman;
    }

    public void setIranOuterDarman(Long iranOuterDarman) {
        this.iranOuterDarman = iranOuterDarman;
    }

    public Long getnIranOuter14() {
        return nIranOuter14;
    }

    public void setnIranOuter14(Long nIranOuter14) {
        this.nIranOuter14 = nIranOuter14;
    }

    public Long getnIranOuter18() {
        return nIranOuter18;
    }

    public void setnIranOuter18(Long nIranOuter18) {
        this.nIranOuter18 = nIranOuter18;
    }

    public Long getnIranOuterDarman() {
        return nIranOuterDarman;
    }

    public void setnIranOuterDarman(Long nIranOuterDarman) {
        this.nIranOuterDarman = nIranOuterDarman;
    }

    public Long getnMost1894() {
        return nMost1894;
    }

    public void setnMost1894(Long nMost1894) {
        this.nMost1894 = nMost1894;
    }

    public Long getMost1894() {
        return most1894;
    }

    public void setMost1894(Long most1894) {
        this.most1894 = most1894;
    }

    public Long getkEnKosor() {
        return kEnKosor;
    }

    public void setkEnKosor(Long kEnKosor) {
        this.kEnKosor = kEnKosor;
    }

    public Long getnEnKosor() {
        return nEnKosor;
    }

    public void setnEnKosor(Long nEnKosor) {
        this.nEnKosor = nEnKosor;
    }

    public Long getKarMRostaii() {
        return karMRostaii;
    }

    public void setKarMRostaii(Long karMRostaii) {
        this.karMRostaii = karMRostaii;
    }

    public Long getnKarMRostaii() {
        return nKarMRostaii;
    }

    public void setnKarMRostaii(Long nKarMRostaii) {
        this.nKarMRostaii = nKarMRostaii;
    }

    public Long getConfirmAmt1() {
        return confirmAmt1;
    }

    public void setConfirmAmt1(Long confirmAmt1) {
        this.confirmAmt1 = confirmAmt1;
    }

    public Long getNokhbe12() {
        return nokhbe12;
    }

    public void setNokhbe12(Long nokhbe12) {
        this.nokhbe12 = nokhbe12;
    }

    public Long getNokhbe14() {
        return nokhbe14;
    }

    public void setNokhbe14(Long nokhbe14) {
        this.nokhbe14 = nokhbe14;
    }

    public Long getNokhbe18() {
        return nokhbe18;
    }

    public void setNokhbe18(Long nokhbe18) {
        this.nokhbe18 = nokhbe18;
    }

    public Long getnNokhbe12() {
        return nNokhbe12;
    }

    public void setnNokhbe12(Long nNokhbe12) {
        this.nNokhbe12 = nNokhbe12;
    }

    public Long getnNokhbe14() {
        return nNokhbe14;
    }

    public void setnNokhbe14(Long nNokhbe14) {
        this.nNokhbe14 = nNokhbe14;
    }

    public Long getnNokhbe18() {
        return nNokhbe18;
    }

    public void setnNokhbe18(Long nNokhbe18) {
        this.nNokhbe18 = nNokhbe18;
    }

    public Long getRcsChqno96() {
        return rcsChqno96;
    }

    public void setRcsChqno96(Long rcsChqno96) {
        this.rcsChqno96 = rcsChqno96;
    }

    public Long getRcsChqamt96() {
        return rcsChqamt96;
    }

    public void setRcsChqamt96(Long rcsChqamt96) {
        this.rcsChqamt96 = rcsChqamt96;
    }

    public Long getvVosolhesab() {
        return vVosolhesab;
    }

    public void setvVosolhesab(Long vVosolhesab) {
        this.vVosolhesab = vVosolhesab;
    }

    public Long getvCnthesab() {
        return vCnthesab;
    }

    public void setvCnthesab(Long vCnthesab) {
        this.vCnthesab = vCnthesab;
    }

    public Long getBakhshodekarNBefore() {
        return bakhshodekarNBefore;
    }

    public void setBakhshodekarNBefore(Long bakhshodekarNBefore) {
        this.bakhshodekarNBefore = bakhshodekarNBefore;
    }

    public Long getBakhshodekarNAfter() {
        return bakhshodekarNAfter;
    }

    public void setBakhshodekarNAfter(Long bakhshodekarNAfter) {
        this.bakhshodekarNAfter = bakhshodekarNAfter;
    }

    public Long getBakhshodeNBefore() {
        return bakhshodeNBefore;
    }

    public void setBakhshodeNBefore(Long bakhshodeNBefore) {
        this.bakhshodeNBefore = bakhshodeNBefore;
    }

    public Long getBakhshodeNAfter() {
        return bakhshodeNAfter;
    }

    public void setBakhshodeNAfter(Long bakhshodeNAfter) {
        this.bakhshodeNAfter = bakhshodeNAfter;
    }

    public Long getNimoshrPrAfter() {
        return nimoshrPrAfter;
    }

    public void setNimoshrPrAfter(Long nimoshrPrAfter) {
        this.nimoshrPrAfter = nimoshrPrAfter;
    }

    public Long getNnimoshrPrAfter() {
        return nnimoshrPrAfter;
    }

    public void setNnimoshrPrAfter(Long nnimoshrPrAfter) {
        this.nnimoshrPrAfter = nnimoshrPrAfter;
    }

    public Long getLastBikbakhshodAfter() {
        return lastBikbakhshodAfter;
    }

    public void setLastBikbakhshodAfter(Long lastBikbakhshodAfter) {
        this.lastBikbakhshodAfter = lastBikbakhshodAfter;
    }

    public Long getJarimehBakhshodAfter() {
        return jarimehBakhshodAfter;
    }

    public void setJarimehBakhshodAfter(Long jarimehBakhshodAfter) {
        this.jarimehBakhshodAfter = jarimehBakhshodAfter;
    }

    public Long getLastBakhshodeAfter() {
        return lastBakhshodeAfter;
    }

    public void setLastBakhshodeAfter(Long lastBakhshodeAfter) {
        this.lastBakhshodeAfter = lastBakhshodeAfter;
    }

    public Long getNnimoshrPrBefore() {
        return nnimoshrPrBefore;
    }

    public void setNnimoshrPrBefore(Long nnimoshrPrBefore) {
        this.nnimoshrPrBefore = nnimoshrPrBefore;
    }

    public Long getLastBikbakhshodBefore() {
        return lastBikbakhshodBefore;
    }

    public void setLastBikbakhshodBefore(Long lastBikbakhshodBefore) {
        this.lastBikbakhshodBefore = lastBikbakhshodBefore;
    }

    public Long getJarimehBakhshodBefore() {
        return jarimehBakhshodBefore;
    }

    public void setJarimehBakhshodBefore(Long jarimehBakhshodBefore) {
        this.jarimehBakhshodBefore = jarimehBakhshodBefore;
    }

    public Long getLastBakhshodeBefore() {
        return lastBakhshodeBefore;
    }

    public void setLastBakhshodeBefore(Long lastBakhshodeBefore) {
        this.lastBakhshodeBefore = lastBakhshodeBefore;
    }

    public Long getNimoshrPrBefore() {
        return nimoshrPrBefore;
    }

    public void setNimoshrPrBefore(Long nimoshrPrBefore) {
        this.nimoshrPrBefore = nimoshrPrBefore;
    }

    public Long getNdarkhastBakhshodehBefore() {
        return ndarkhastBakhshodehBefore;
    }

    public void setNdarkhastBakhshodehBefore(Long ndarkhastBakhshodehBefore) {
        this.ndarkhastBakhshodehBefore = ndarkhastBakhshodehBefore;
    }

    public Long getNdarkhastBakhshodehAfter() {
        return ndarkhastBakhshodehAfter;
    }

    public void setNdarkhastBakhshodehAfter(Long ndarkhastBakhshodehAfter) {
        this.ndarkhastBakhshodehAfter = ndarkhastBakhshodehAfter;
    }

    public Long getKmostj17N() {
        return kmostj17N;
    }

    public void setKmostj17N(Long kmostj17N) {
        this.kmostj17N = kmostj17N;
    }

    public Long getBmostj17N() {
        return bmostj17N;
    }

    public void setBmostj17N(Long bmostj17N) {
        this.bmostj17N = bmostj17N;
    }

    public Long getNmos53() {
        return nmos53;
    }

    public void setNmos53(Long nmos53) {
        this.nmos53 = nmos53;
    }

    public Long getNmos462() {
        return nmos462;
    }

    public void setNmos462(Long nmos462) {
        this.nmos462 = nmos462;
    }

    public Long getNhardAmt495() {
        return nhardAmt495;
    }

    public void setNhardAmt495(Long nhardAmt495) {
        this.nhardAmt495 = nhardAmt495;
    }

    public Long getNhardMost495() {
        return nhardMost495;
    }

    public void setNhardMost495(Long nhardMost495) {
        this.nhardMost495 = nhardMost495;
    }

    public Long getNfani677() {
        return nfani677;
    }

    public void setNfani677(Long nfani677) {
        this.nfani677 = nfani677;
    }

    public Long getNekh27() {
        return nekh27;
    }

    public void setNekh27(Long nekh27) {
        this.nekh27 = nekh27;
    }

    public Long getNmos461() {
        return nmos461;
    }

    public void setNmos461(Long nmos461) {
        this.nmos461 = nmos461;
    }

}
