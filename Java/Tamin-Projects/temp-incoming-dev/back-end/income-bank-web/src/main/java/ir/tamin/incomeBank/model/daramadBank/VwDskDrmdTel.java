/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author f_fotuhi
 */
@Entity
@Table(name = "VWDSKDRMD_TEL")

public class VwDskDrmdTel implements Serializable {

    private static final long serialVersionUID = 1L;
//    @Size(max = 2)
//    @Column(name = "YY")
//    private String yy;
//    @Basic(optional = false)
//    @NotNull
//    @Size(min = 1, max = 2)
//    @Column(name = "MM")
//    private String mm;
//    @Basic(optional = false)
//    @NotNull
//    @Size(min = 1, max = 2)
//    @Column(name = "DD")
//    private String dd;
    @Transient
    private String ERS_DAT;
    @EmbeddedId
    protected DrmdTelInfoPK telInfoPK;

    @Column(name = "P_ELAMI")
    private BigInteger pElami;
    @Column(name = "N_ELAMI")
    private BigInteger nElami;
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
    @Column(name = "XJANBD")
    private Long xjanbd;
    @Column(name = "YJANBD")
    private Long yjanbd;
    @Column(name = "SJANBD")
    private Long sjanbd;
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
    @Column(name = "INSCNTLRE")
    private BigInteger inscntlre;
    @Column(name = "INSCNTREQ")
    private BigInteger inscntreq;
    @Column(name = "INSTYP1")
    private BigInteger instyp1;
    @Column(name = "INSTYP2")
    private BigInteger instyp2;
    @Column(name = "INSTYP3")
    private BigInteger instyp3;
    @Column(name = "INSTYP4")
    private BigInteger instyp4;
    @Column(name = "INSPYM")
    private BigInteger inspym;
    @Column(name = "INSNONA")
    private BigInteger insnona;
    @Column(name = "NO_84")
    private BigInteger no84;
    @Column(name = "P_NO_84")
    private BigInteger pNo84;
    @Column(name = "NO_EJRA")
    private BigInteger noEjra;
    @Column(name = "NO_FAAL")
    private BigInteger noFaal;
    @Column(name = "MAKHTOM")
    private BigInteger makhtom;
    @Column(name = "KHAREJ")
    private BigInteger kharej;
    @Column(name = "KASRJ")
    private BigInteger kasrj;
    @Column(name = "NO_19")
    private BigInteger no19;
    @Column(name = "NO_WSH07")
    private BigInteger noWsh07;
    @Column(name = "C_01")
    private Long c01;
    @Column(name = "AMOUNT_01")
    private BigInteger amount01;
    @Column(name = "C_02")
    private Long c02;
    @Column(name = "AMOUNT_02")
    private BigInteger amount02;
    @Column(name = "C_04")
    private Long c04;
    @Column(name = "AMOUNT_04")
    private BigInteger amount04;
    @Column(name = "C_07")
    private Long c07;
    @Column(name = "AMOUNT_07")
    private BigInteger amount07;
    @Column(name = "C_08")
    private Long c08;
    @Column(name = "AMOUNT_08")
    private BigInteger amount08;
    @Column(name = "C_16")
    private Long c16;
    @Column(name = "AMOUNT_16")
    private BigInteger amount16;
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
    private BigInteger pShd01;
    @Column(name = "P_SHD02")
    private BigInteger pShd02;
    @Column(name = "P_SHD03")
    private BigInteger pShd03;
    @Column(name = "D_SHD01")
    private BigInteger dShd01;
    @Column(name = "D_SHD02")
    private BigInteger dShd02;
    @Column(name = "D_SHD03")
    private BigInteger dShd03;
    @Column(name = "SHD12")
    private BigInteger shd12;
    @Column(name = "SHD14")
    private BigInteger shd14;
    @Column(name = "SHD18")
    private BigInteger shd18;
    @Column(name = "PAY_SHD")
    private BigInteger payShd;
    @Column(name = "TRANSK")
    private BigInteger transk;
    @Column(name = "TRANS")
    private BigInteger trans;
    @Column(name = "TRANSK_D")
    private BigInteger transkD;
    @Column(name = "TRANSK_B")
    private BigInteger transkB;
    @Column(name = "TRANSK_K")
    private BigInteger transkK;
    @Column(name = "TRANS_D")
    private BigInteger transD;
    @Column(name = "TRANS_B")
    private BigInteger transB;
    @Column(name = "TRANS_K")
    private BigInteger transK;
    @Column(name = "MOST87")
    private BigInteger most87;
    @Column(name = "MOSTD87")
    private BigInteger mostd87;
    @Column(name = "MOSTMD87")
    private BigInteger mostmd87;
    @Column(name = "TRAN_D")
    private BigInteger tranD;
    @Column(name = "TRAN_BIM")
    private BigInteger tranBim;
    @Column(name = "TTRANS")
    private BigInteger ttrans;
    @Column(name = "MOSTB87")
    private BigInteger mostb87;
    @Column(name = "MOSTDB87")
    private BigInteger mostdb87;
    @Column(name = "NIMOSHR")
    private BigInteger nimoshr;
    @Column(name = "NNIMOSHR")
    private BigInteger nnimoshr;
    @Column(name = "PSNT7")
    private Long psnt7;
    @Column(name = "KPSNT7")
    private Long kpsnt7;
    @Column(name = "TPSNT7")
    private Long tpsnt7;
    @Column(name = "LASTDBT")
    private BigInteger lastdbt;
    @Column(name = "CURDBT")
    private BigInteger curdbt;
    @Column(name = "PERMET")
    private BigInteger permet;
    @Column(name = "CURMET")
    private BigInteger curmet;
    @Column(name = "CNTCMF")
    private BigInteger cntcmf;
    @Column(name = "CNTCNL")
    private BigInteger cntcnl;
    @Column(name = "GHARAR")
    private BigInteger gharar;
    @Column(name = "TAJDBT")
    private BigInteger tajdbt;
    @Column(name = "BADVWAIT")
    private BigInteger badvwait;
    @Column(name = "VOTEWAIT")
    private BigInteger votewait;
    @Column(name = "BADVGHARAR")
    private BigInteger badvgharar;
    @Column(name = "BADVCALC")
    private BigInteger badvcalc;
    @Column(name = "TAJDWAIT")
    private BigInteger tajdwait;
    @Column(name = "TAJDGHARAR")
    private BigInteger tajdgharar;
    @Column(name = "TAJDCALC")
    private BigInteger tajdcalc;
    @Column(name = "BLD_KT")
    private BigInteger bldKt;
    @Column(name = "BLD_SZ")
    private BigInteger bldSz;
    @Column(name = "BLD_MHR")
    private BigInteger bldMhr;
    @Column(name = "BLD_MT")
    private BigInteger bldMt;
    @Column(name = "BLD_RST")
    private BigInteger bldRst;
    @Column(name = "NBLD_KT")
    private BigInteger nbldKt;
    @Column(name = "NBLD_SZ")
    private BigInteger nbldSz;
    @Column(name = "NBLD_MHR")
    private BigInteger nbldMhr;
    @Column(name = "NBLD_MT")
    private BigInteger nbldMt;
    @Column(name = "NBLD_RST")
    private BigInteger nbldRst;
    @Column(name = "BAZ_ERFAGH")
    private BigInteger bazErfagh;
    @Column(name = "BIM_ERFAGH")
    private BigInteger bimErfagh;
    @Column(name = "BLD_BIM")
    private BigInteger bldBim;
    @Column(name = "BLD_BIMGVH")
    private BigInteger bldBimgvh;
    @Column(name = "BLD_BIMNO")
    private BigInteger bldBimno;
    @Column(name = "NMADE66")
    private BigInteger nmade66;
    @Column(name = "HAND_BIM1")
    private BigInteger handBim1;
    @Column(name = "HAND_BIM2")
    private BigInteger handBim2;
    @Column(name = "HAND_BIMNO")
    private BigInteger handBimno;
    @Column(name = "HAND_BIMGVH")
    private BigInteger handBimgvh;
    @Column(name = "AZAD12")
    private BigInteger azad12;
    @Column(name = "AZAD14")
    private BigInteger azad14;
    @Column(name = "AZAD18")
    private BigInteger azad18;
    @Column(name = "EKHN")
    private BigInteger ekhn;
    @Column(name = "AZAD12_NO")
    private BigInteger azad12No;
    @Column(name = "AZAD14_NO")
    private BigInteger azad14No;
    @Column(name = "AZAD18_NO")
    private BigInteger azad18No;
    @Column(name = "EKHN_NO")
    private BigInteger ekhnNo;
    @Column(name = "BIM605")
    private BigInteger bim605;
    @Column(name = "BIM605_NO")
    private BigInteger bim605No;
    @Column(name = "ELAMIYE")
    private BigInteger elamiye;
    @Column(name = "NO_ELAMIYE")
    private BigInteger noElamiye;
    @Column(name = "PSNT8")
    private BigInteger psnt8;
    @Column(name = "KPSNT8")
    private BigInteger kpsnt8;
    @Column(name = "TPSNT8")
    private BigInteger tpsnt8;
    @Column(name = "PSNT9")
    private BigInteger psnt9;
    @Column(name = "KPSNT9")
    private BigInteger kpsnt9;
    @Column(name = "TPSNT9")
    private BigInteger tpsnt9;
    @Column(name = "PSNT10")
    private BigInteger psnt10;
    @Column(name = "KPSNT10")
    private BigInteger kpsnt10;
    @Column(name = "TPSNT10")
    private BigInteger tpsnt10;
    @Column(name = "PSNT11")
    private BigInteger psnt11;
    @Column(name = "KPSNT11")
    private BigInteger kpsnt11;
    @Column(name = "TPSNT11")
    private BigInteger tpsnt11;
    @Column(name = "PSNT12")
    private BigInteger psnt12;
    @Column(name = "KPSNT12")
    private BigInteger kpsnt12;
    @Column(name = "TPSNT12")
    private BigInteger tpsnt12;
    @Column(name = "DDRIVE_B1")
    private BigInteger ddriveB1;
    @Column(name = "DDRIVE_B2")
    private BigInteger ddriveB2;
    @Column(name = "DDRIVE_S1")
    private BigInteger ddriveS1;
    @Column(name = "DDRIVE_S2")
    private BigInteger ddriveS2;
    @Column(name = "DDRIVE_D1")
    private BigInteger ddriveD1;
    @Column(name = "DDRIVE_D2")
    private BigInteger ddriveD2;
    @Column(name = "BDRIVE_B1")
    private BigInteger bdriveB1;
    @Column(name = "BDRIVE_B2")
    private BigInteger bdriveB2;
    @Column(name = "BDRIVE_B3")
    private BigInteger bdriveB3;
    @Column(name = "BDRIVE_S1")
    private BigInteger bdriveS1;
    @Column(name = "BDRIVE_S2")
    private BigInteger bdriveS2;
    @Column(name = "BDRIVE_S3")
    private BigInteger bdriveS3;
    @Column(name = "BDRIVE_D1")
    private BigInteger bdriveD1;
    @Column(name = "BDRIVE_D2")
    private BigInteger bdriveD2;
    @Column(name = "BDRIVE_D3")
    private BigInteger bdriveD3;
    @Column(name = "N_MOST10")
    private BigInteger nMost10;
    @Column(name = "NBEHZIST")
    private BigInteger nbehzist;
    @Column(name = "KBEHZIST")
    private BigInteger kbehzist;
    @Column(name = "GOVBEHZIST")
    private BigInteger govbehzist;
    @Column(name = "KOM_SAR12")
    private BigInteger komSar12;
    @Column(name = "KOM_SAR14")
    private BigInteger komSar14;
    @Column(name = "KOM_SAR18")
    private BigInteger komSar18;
    @Column(name = "KOM_MAD12")
    private BigInteger komMad12;
    @Column(name = "KOM_MAD14")
    private BigInteger komMad14;
    @Column(name = "KOM_MAD18")
    private BigInteger komMad18;
    @Column(name = "BEH_SAR12")
    private BigInteger behSar12;
    @Column(name = "BEH_SAR14")
    private BigInteger behSar14;
    @Column(name = "BEH_SAR18")
    private BigInteger behSar18;
    @Column(name = "BEH_MAD12")
    private BigInteger behMad12;
    @Column(name = "BEH_MAD14")
    private BigInteger behMad14;
    @Column(name = "BEH_MAD18")
    private BigInteger behMad18;
    @Column(name = "MAHD_M12")
    private BigInteger mahdM12;
    @Column(name = "MAHD_M14")
    private BigInteger mahdM14;
    @Column(name = "MAHD_M18")
    private BigInteger mahdM18;
    @Column(name = "NKOM_SAR12")
    private BigInteger nkomSar12;
    @Column(name = "NKOM_SAR14")
    private BigInteger nkomSar14;
    @Column(name = "NKOM_SAR18")
    private BigInteger nkomSar18;
    @Column(name = "NKOM_MAD12")
    private BigInteger nkomMad12;
    @Column(name = "NKOM_MAD14")
    private BigInteger nkomMad14;
    @Column(name = "NKOM_MAD18")
    private BigInteger nkomMad18;
    @Column(name = "NBEH_SAR12")
    private BigInteger nbehSar12;
    @Column(name = "NBEH_SAR14")
    private BigInteger nbehSar14;
    @Column(name = "NBEH_SAR18")
    private BigInteger nbehSar18;
    @Column(name = "NBEH_MAD12")
    private BigInteger nbehMad12;
    @Column(name = "NBEH_MAD14")
    private BigInteger nbehMad14;
    @Column(name = "NBEH_MAD18")
    private BigInteger nbehMad18;
    @Column(name = "NMAHD_M12")
    private BigInteger nmahdM12;
    @Column(name = "NMAHD_M14")
    private BigInteger nmahdM14;
    @Column(name = "NMAHD_M18")
    private BigInteger nmahdM18;
    @Column(name = "HADAF_37")
    private BigInteger hadaf37;
    @Column(name = "NBEHZIST1")
    private BigInteger nbehzist1;
    @Column(name = "KBEHZIST1")
    private BigInteger kbehzist1;
    @Column(name = "GOVBEHZIST1")
    private BigInteger govbehzist1;
    @Column(name = "KGOVBEHZIST")
    private BigInteger kgovbehzist;
    @Column(name = "KGOVBEHZIST1")
    private BigInteger kgovbehzist1;
    @Column(name = "DDRIVE1")
    private BigInteger ddrive1;
    @Column(name = "DDRIVE2")
    private BigInteger ddrive2;
    @Column(name = "ESARAT_AZADD")
    private BigInteger esaratAzadd;
    @Column(name = "JANG_JANBD")
    private BigInteger jangJanbd;
    @Column(name = "ESARAT_D")
    private BigInteger esaratD;
    @Column(name = "AZADEGAN_D")
    private BigInteger azadeganD;
    @Column(name = "JANG_JANBD3")
    private BigInteger jangJanbd3;
    @Column(name = "ESARAT_AZADK")
    private BigInteger esaratAzadk;
    @Column(name = "JANG_JANBK")
    private BigInteger jangJanbk;
    @Column(name = "JANG_JANBK3")
    private BigInteger jangJanbk3;
    @Column(name = "NESARAT_AZADD")
    private BigInteger nesaratAzadd;
    @Column(name = "NJANG_JANBD")
    private BigInteger njangJanbd;
    @Column(name = "NESARAT_D")
    private BigInteger nesaratD;
    @Column(name = "NAZADEGAN_D")
    private BigInteger nazadeganD;
    @Column(name = "NJANG_JANBD3")
    private BigInteger njangJanbd3;
    @Column(name = "NESARAT_AZADK")
    private BigInteger nesaratAzadk;
    @Column(name = "NJANG_JANBK")
    private BigInteger njangJanbk;
    @Column(name = "NJANG_JANBK3")
    private BigInteger njangJanbk3;
    @Column(name = "SAYADAN")
    private BigInteger sayadan;
    @Column(name = "ZANBORDARAN")
    private BigInteger zanbordaran;
    @Column(name = "NSAYAD")
    private BigInteger nsayad;
    @Column(name = "NZANBOR")
    private BigInteger nzanbor;
    @Column(name = "KOMAKZANBOR")
    private BigInteger komakzanbor;
    @Column(name = "KOMAKSAYAD")
    private BigInteger komaksayad;
    @Column(name = "MOST_56")
    private BigInteger most56;
    @Column(name = "NMOST_56")
    private BigInteger nmost56;
    @Column(name = "NKARFARMA1")
    private BigInteger nkarfarma1;
    @Column(name = "KKARFARMA1")
    private BigInteger kkarfarma1;
    @Column(name = "NKARFARMA2")
    private BigInteger nkarfarma2;
    @Column(name = "KKARFARMA2")
    private BigInteger kkarfarma2;
    @Column(name = "KGOVKARFARMA1")
    private BigInteger kgovkarfarma1;
    @Column(name = "PSNT13")
    private BigInteger psnt13;
    @Column(name = "TPSNT13")
    private BigInteger tpsnt13;
    @Column(name = "KPSNT13")
    private BigInteger kpsnt13;
    @Column(name = "TPSNT14")
    private BigInteger tpsnt14;
    @Column(name = "KPSNT14")
    private BigInteger kpsnt14;
    @Column(name = "PSNT14")
    private BigInteger psnt14;
    @Column(name = "TEL")
    private BigInteger tel;
    @Column(name = "ACC")
    private BigInteger acc;
    @Column(name = "ACCRES")
    private BigInteger accres;
    @Column(name = "REGINGO")
    private BigInteger regingo;
    @Column(name = "REALPEOPLE")
    private BigInteger realpeople;
    @Column(name = "LAWPEOPLE")
    private BigInteger lawpeople;
    @Column(name = "EJRA")
    private BigInteger ejra;
    @Column(name = "ASSIGN")
    private BigInteger assign;
    @Column(name = "PERSON")
    private BigInteger person;
    @Column(name = "STOCK")
    private BigInteger stock;
    @Column(name = "GUARANTY")
    private BigInteger guaranty;
    @Column(name = "AUCTION")
    private BigInteger auction;
    @Column(name = "AMVAL")
    private BigInteger amval;
    @Column(name = "ESTATE")
    private BigInteger estate;
    @Column(name = "ACT")
    private BigInteger act;
    @Column(name = "DOCTOR")
    private BigInteger doctor;
    @Column(name = "CHKLAW")
    private BigInteger chklaw;
    @Column(name = "REALINS")
    private BigInteger realins;
    @Column(name = "LAWINS")
    private BigInteger lawins;
    @Column(name = "EVALU")
    private BigInteger evalu;
    @Column(name = "WARN")
    private BigInteger warn;
    @Column(name = "PROCEED")
    private BigInteger proceed;
    @Column(name = "NKARFARMA3")
    private BigInteger nkarfarma3;
    @Column(name = "KKARFARMA3")
    private BigInteger kkarfarma3;
    @Column(name = "CURN_BAKHSHODE")
    private BigInteger curnBakhshode;
    @Column(name = "LAST_BAKHSHODE")
    private BigInteger lastBakhshode;
    @Column(name = "CURN_BIKBAKHSHOD")
    private BigInteger curnBikbakhshod;
    @Column(name = "LAST_BIKBAKHSHOD")
    private BigInteger lastBikbakhshod;
    @Column(name = "JARIMEH_BAKHSHOD")
    private BigInteger jarimehBakhshod;
    @Column(name = "BAKHSHODE")
    private BigInteger bakhshode;
    @Column(name = "BAKHSHODKAR")
    private BigInteger bakhshodkar;
    @Column(name = "NIMOSHR_PR")
    private BigInteger nimoshrPr;
    @Column(name = "NNIMOSHR_PR")
    private BigInteger nnimoshrPr;
    @Column(name = "MOST_56_4")
    private BigInteger most564;
    @Column(name = "NMOST_56_4")
    private BigInteger nmost564;
    @Column(name = "PNH12")
    private BigInteger pnh12;
    @Column(name = "PNH14")
    private BigInteger pnh14;
    @Column(name = "PNH18")
    private BigInteger pnh18;
    @Column(name = "S_PNH12")
    private BigInteger sPnh12;
    @Column(name = "S_PNH14")
    private BigInteger sPnh14;
    @Column(name = "S_PNH18")
    private BigInteger sPnh18;
    @Column(name = "K_PNH12")
    private BigInteger kPnh12;
    @Column(name = "K_PNH14")
    private BigInteger kPnh14;
    @Column(name = "K_PNH18")
    private BigInteger kPnh18;
    @Column(name = "K_S_PNH12")
    private BigInteger kSPnh12;
    @Column(name = "K_S_PNH14")
    private BigInteger kSPnh14;
    @Column(name = "K_S_PNH18")
    private BigInteger kSPnh18;
    @Column(name = "NO_PNH12")
    private BigInteger noPnh12;
    @Column(name = "NO_PNH14")
    private BigInteger noPnh14;
    @Column(name = "NO_PNH18")
    private BigInteger noPnh18;
    @Column(name = "HESABRESI_V")
    private BigInteger hesabresiV;
    @Column(name = "HESABRESI_V_NO")
    private BigInteger hesabresiVNo;
    @Column(name = "CURN_BAKHSHODE_N")
    private BigInteger curnBakhshodeN;
    @Column(name = "LAST_BAKHSHODE_N")
    private BigInteger lastBakhshodeN;
    @Column(name = "CURN_BIKBAKHSHOD_N")
    private BigInteger curnBikbakhshodN;
    @Column(name = "LAST_BIKBAKHSHOD_N")
    private BigInteger lastBikbakhshodN;
    @Column(name = "JARIMEH_BAKHSHOD_N")
    private BigInteger jarimehBakhshodN;
    @Column(name = "BAKHSHODE_N")
    private BigInteger bakhshodeN;
    @Column(name = "BAKHSHODKAR_N")
    private BigInteger bakhshodkarN;
    @Column(name = "NIMOSHR_PR_N")
    private BigInteger nimoshrPrN;
    @Column(name = "NNIMOSHR_PR_N")
    private BigInteger nnimoshrPrN;
    @Column(name = "NDARKHAST_BAKHSHODEH")
    private BigInteger ndarkhastBakhshodeh;
    @Column(name = "INSWSH1_RS")
    private BigInteger inswsh1Rs;
    @Column(name = "INSWSH2_RS")
    private BigInteger inswsh2Rs;
    @Column(name = "INSWSH3_RS")
    private BigInteger inswsh3Rs;
    @Column(name = "INSWSH4_RS")
    private BigInteger inswsh4Rs;
    @Column(name = "INSWSH_TOTAL_RS")
    private BigInteger inswshTotalRs;
    @Column(name = "MOST_65")
    private BigInteger most65;
    @Column(name = "NMOST_65")
    private BigInteger nmost65;
    @Column(name = "FUNDTMP_KAR")
    private BigInteger fundtmpKar;
    @Column(name = "N_FUNDTMP_KAR")
    private BigInteger nFundtmpKar;
    @Column(name = "CONFIRM_AMT")
    private BigInteger confirmAmt;
    @Column(name = "N_CONFIRM_AMT")
    private BigInteger nConfirmAmt;
    @Column(name = "REFUND_AMT")
    private BigInteger refundAmt;
    @Column(name = "N_REFUND_AMT")
    private BigInteger nRefundAmt;
    @Column(name = "CURKARFARMA")
    private BigInteger curkarfarma;
    @Column(name = "CURDOLAT")
    private BigInteger curdolat;
    @Column(name = "MOST100")
    private BigInteger most100;
    @Column(name = "N_CURKARFARMA")
    private BigInteger nCurkarfarma;
    @Column(name = "N_CURDOLAT")
    private BigInteger nCurdolat;
    @Column(name = "N_MOST100")
    private BigInteger nMost100;
    @Column(name = "HARD_AMT495")
    private BigInteger hardAmt495;
    @Column(name = "HARD_MOST495")
    private BigInteger hardMost495;
    @Column(name = "AMTBED")
    private BigInteger amtbed;
    @Column(name = "AMTBEDM")
    private BigInteger amtbedm;
    @Column(name = "IRAN_OUTER_14")
    private BigInteger iranOuter14;
    @Column(name = "IRAN_OUTER_18")
    private BigInteger iranOuter18;
    @Column(name = "IRAN_OUTER_DARMAN")
    private BigInteger iranOuterDarman;
    @Column(name = "N_IRAN_OUTER_14")
    private BigInteger nIranOuter14;
    @Column(name = "N_IRAN_OUTER_18")
    private BigInteger nIranOuter18;
    @Column(name = "N_IRAN_OUTER_DARMAN")
    private BigInteger nIranOuterDarman;
    @Column(name = "N_MOST18_94")
    private BigInteger nMost1894;
    @Column(name = "MOST18_94")
    private BigInteger most1894;
    @Column(name = "K_EN_KOSOR")
    private BigInteger kEnKosor;
    @Column(name = "N_EN_KOSOR")
    private BigInteger nEnKosor;
    @Column(name = "KAR_M_ROSTAII")
    private BigInteger karMRostaii;
    @Column(name = "N_KAR_M_ROSTAII")
    private BigInteger nKarMRostaii;
    @Column(name = "CONFIRM_AMT1")
    private BigInteger confirmAmt1;
    @Column(name = "V_VOSOLHESAB")
    private BigInteger vVosolhesab;
    @Column(name = "V_CNTHESAB")
    private BigInteger vCnthesab;
    @Column(name = "RCS_CHQNO96")
    private BigInteger rcsChqno96;
    @Column(name = "RCS_CHQAMT96")
    private BigInteger rcsChqamt96;
    @Column(name = "NOKHBE12")
    private BigInteger nokhbe12;
    @Column(name = "NOKHBE14")
    private BigInteger nokhbe14;
    @Column(name = "NOKHBE18")
    private BigInteger nokhbe18;
    @Column(name = "N_NOKHBE12")
    private BigInteger nNokhbe12;
    @Column(name = "N_NOKHBE14")
    private BigInteger nNokhbe14;
    @Column(name = "N_NOKHBE18")
    private BigInteger nNokhbe18;
    @Column(name = "BAKHSHODEKAR_N_BEFORE")
    private BigInteger bakhshodekarNBefore;
    @Column(name = "BAKHSHODEKAR_N_AFTER")
    private BigInteger bakhshodekarNAfter;
    @Column(name = "BAKHSHODE_N_BEFORE")
    private BigInteger bakhshodeNBefore;
    @Column(name = "BAKHSHODE_N_AFTER")
    private BigInteger bakhshodeNAfter;
    @Column(name = "NIMOSHR_PR_AFTER")
    private BigInteger nimoshrPrAfter;
    @Column(name = "NNIMOSHR_PR_AFTER")
    private BigInteger nnimoshrPrAfter;
    @Column(name = "LAST_BIKBAKHSHOD_AFTER")
    private BigInteger lastBikbakhshodAfter;
    @Column(name = "JARIMEH_BAKHSHOD_AFTER")
    private BigInteger jarimehBakhshodAfter;
    @Column(name = "LAST_BAKHSHODE_AFTER")
    private BigInteger lastBakhshodeAfter;
    @Column(name = "NNIMOSHR_PR_BEFORE")
    private BigInteger nnimoshrPrBefore;
    @Column(name = "LAST_BIKBAKHSHOD_BEFORE")
    private BigInteger lastBikbakhshodBefore;
    @Column(name = "JARIMEH_BAKHSHOD_BEFORE")
    private BigInteger jarimehBakhshodBefore;
    @Column(name = "LAST_BAKHSHODE_BEFORE")
    private BigInteger lastBakhshodeBefore;
    @Column(name = "NIMOSHR_PR_BEFORE")
    private BigInteger nimoshrPrBefore;
    @Column(name = "NDARKHAST_BAKHSHODEH_AFTER")
    private BigInteger ndarkhastBakhshodehAfter;
    @Column(name = "NDARKHAST_BAKHSHODEH_BEFORE")
    private BigInteger ndarkhastBakhshodehBefore;
    @Column(name = "KMOSTJ17_N")
    private BigInteger kmostj17N;
    @Column(name = "BMOSTJ17_N")
    private BigInteger bmostj17N;
    @Column(name = "MOS_53")
    private BigInteger mos53;
    @Column(name = "N_MOS_53")
    private BigInteger nMos53;
    @Column(name = "BIMK46_1")
    private BigInteger bimk461;
    @Column(name = "BIM46_1")
    private BigInteger bim461;
    @Column(name = "MOS46_1")
    private BigInteger mos461;
    @Column(name = "N_MOS46_1")
    private BigInteger nMos461;
    @Column(name = "BIMK46_2")
    private BigInteger bimk462;
    @Column(name = "BIM46_2")
    private BigInteger bim462;
    @Column(name = "MOS46_2")
    private BigInteger mos462;
    @Column(name = "N_MOS46_2")
    private BigInteger nMos462;
    @Column(name = "FANI677")
    private BigInteger fani677;
    @Column(name = "EKH27")
    private BigInteger ekh27;
    @Column(name = "N_HARD_AMT495")
    private BigInteger nHardAmt495;
    @Column(name = "N_HARD_MOST495")
    private BigInteger nHardMost495;
    @Column(name = "N_FANI677")
    private BigInteger nFani677;
    @Column(name = "N_EKH27")
    private BigInteger nEkh27;
    @Column(name = "KSAYAD1")
    private BigInteger ksayad1;
    @Column(name = "NSAYAD1")
    private BigInteger nsayad1;
    @Column(name = "KGOVSAYAD1")
    private BigInteger kgovsayad1;
    @Column(name = "GOVSAYAD1")
    private BigInteger govsayad1;
    @Column(name = "MHLPMOSHAVEGH")
    private BigInteger mhlpmoshavegh;
    @Column(name = "MKARMOSHAVEGH")
    private BigInteger mkarmoshavegh;
    @Column(name = "MBIMMOSHAVEGH")
    private BigInteger mbimmoshavegh;
//    @Basic(optional = false)
//    @NotNull
//    @Size(min = 1, max = 4)
//    @Column(name = "BRCH_CODE")
//    private String brchCode;

    @Transient
    private Long sum4;
    @Transient
    private Long sum5;
    @Transient
    private Long sum6;
    @Transient
    private Long sum7;
    @Transient
    private Long sum8;
    @Transient
    private Long sum9;

    public VwDskDrmdTel() {
    }

    public VwDskDrmdTel(DrmdTelInfoPK telInfoPK) {
        this.telInfoPK = telInfoPK;
    }

    public DrmdTelInfoPK getTelInfoPK() {
        return telInfoPK;
    }

    public void setTelInfoPK(DrmdTelInfoPK telInfoPK) {
        this.telInfoPK = telInfoPK;
    }

    public BigInteger getpElami() {
        return pElami;
    }

    public void setpElami(BigInteger pElami) {
        this.pElami = pElami;
    }

    public BigInteger getnElami() {
        return nElami;
    }

    public void setnElami(BigInteger nElami) {
        this.nElami = nElami;
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

    public BigInteger getpNo84() {
        return pNo84;
    }

    public void setpNo84(BigInteger pNo84) {
        this.pNo84 = pNo84;
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

    public BigInteger getpShd01() {
        return pShd01;
    }

    public void setpShd01(BigInteger pShd01) {
        this.pShd01 = pShd01;
    }

    public BigInteger getpShd02() {
        return pShd02;
    }

    public void setpShd02(BigInteger pShd02) {
        this.pShd02 = pShd02;
    }

    public BigInteger getpShd03() {
        return pShd03;
    }

    public void setpShd03(BigInteger pShd03) {
        this.pShd03 = pShd03;
    }

    public BigInteger getdShd01() {
        return dShd01;
    }

    public void setdShd01(BigInteger dShd01) {
        this.dShd01 = dShd01;
    }

    public BigInteger getdShd02() {
        return dShd02;
    }

    public void setdShd02(BigInteger dShd02) {
        this.dShd02 = dShd02;
    }

    public BigInteger getdShd03() {
        return dShd03;
    }

    public void setdShd03(BigInteger dShd03) {
        this.dShd03 = dShd03;
    }

    public BigInteger getnMost10() {
        return nMost10;
    }

    public void setnMost10(BigInteger nMost10) {
        this.nMost10 = nMost10;
    }

    public BigInteger getsPnh12() {
        return sPnh12;
    }

    public void setsPnh12(BigInteger sPnh12) {
        this.sPnh12 = sPnh12;
    }

    public BigInteger getsPnh14() {
        return sPnh14;
    }

    public void setsPnh14(BigInteger sPnh14) {
        this.sPnh14 = sPnh14;
    }

    public BigInteger getsPnh18() {
        return sPnh18;
    }

    public void setsPnh18(BigInteger sPnh18) {
        this.sPnh18 = sPnh18;
    }

    public BigInteger getkPnh12() {
        return kPnh12;
    }

    public void setkPnh12(BigInteger kPnh12) {
        this.kPnh12 = kPnh12;
    }

    public BigInteger getkPnh14() {
        return kPnh14;
    }

    public void setkPnh14(BigInteger kPnh14) {
        this.kPnh14 = kPnh14;
    }

    public BigInteger getkPnh18() {
        return kPnh18;
    }

    public void setkPnh18(BigInteger kPnh18) {
        this.kPnh18 = kPnh18;
    }

    public BigInteger getkSPnh12() {
        return kSPnh12;
    }

    public void setkSPnh12(BigInteger kSPnh12) {
        this.kSPnh12 = kSPnh12;
    }

    public BigInteger getkSPnh14() {
        return kSPnh14;
    }

    public void setkSPnh14(BigInteger kSPnh14) {
        this.kSPnh14 = kSPnh14;
    }

    public BigInteger getkSPnh18() {
        return kSPnh18;
    }

    public void setkSPnh18(BigInteger kSPnh18) {
        this.kSPnh18 = kSPnh18;
    }

    public BigInteger getnFundtmpKar() {
        return nFundtmpKar;
    }

    public void setnFundtmpKar(BigInteger nFundtmpKar) {
        this.nFundtmpKar = nFundtmpKar;
    }

    public BigInteger getnConfirmAmt() {
        return nConfirmAmt;
    }

    public void setnConfirmAmt(BigInteger nConfirmAmt) {
        this.nConfirmAmt = nConfirmAmt;
    }

    public BigInteger getnRefundAmt() {
        return nRefundAmt;
    }

    public void setnRefundAmt(BigInteger nRefundAmt) {
        this.nRefundAmt = nRefundAmt;
    }

    public BigInteger getnCurkarfarma() {
        return nCurkarfarma;
    }

    public void setnCurkarfarma(BigInteger nCurkarfarma) {
        this.nCurkarfarma = nCurkarfarma;
    }

    public BigInteger getnCurdolat() {
        return nCurdolat;
    }

    public void setnCurdolat(BigInteger nCurdolat) {
        this.nCurdolat = nCurdolat;
    }

    public BigInteger getnMost100() {
        return nMost100;
    }

    public void setnMost100(BigInteger nMost100) {
        this.nMost100 = nMost100;
    }

    public BigInteger getnIranOuter14() {
        return nIranOuter14;
    }

    public void setnIranOuter14(BigInteger nIranOuter14) {
        this.nIranOuter14 = nIranOuter14;
    }

    public BigInteger getnIranOuter18() {
        return nIranOuter18;
    }

    public void setnIranOuter18(BigInteger nIranOuter18) {
        this.nIranOuter18 = nIranOuter18;
    }

    public BigInteger getnIranOuterDarman() {
        return nIranOuterDarman;
    }

    public void setnIranOuterDarman(BigInteger nIranOuterDarman) {
        this.nIranOuterDarman = nIranOuterDarman;
    }

    public BigInteger getnMost1894() {
        return nMost1894;
    }

    public void setnMost1894(BigInteger nMost1894) {
        this.nMost1894 = nMost1894;
    }

    public BigInteger getkEnKosor() {
        return kEnKosor;
    }

    public void setkEnKosor(BigInteger kEnKosor) {
        this.kEnKosor = kEnKosor;
    }

    public BigInteger getnEnKosor() {
        return nEnKosor;
    }

    public void setnEnKosor(BigInteger nEnKosor) {
        this.nEnKosor = nEnKosor;
    }

    public BigInteger getnKarMRostaii() {
        return nKarMRostaii;
    }

    public void setnKarMRostaii(BigInteger nKarMRostaii) {
        this.nKarMRostaii = nKarMRostaii;
    }

    public BigInteger getvVosolhesab() {
        return vVosolhesab;
    }

    public void setvVosolhesab(BigInteger vVosolhesab) {
        this.vVosolhesab = vVosolhesab;
    }

    public BigInteger getvCnthesab() {
        return vCnthesab;
    }

    public void setvCnthesab(BigInteger vCnthesab) {
        this.vCnthesab = vCnthesab;
    }

    public BigInteger getnNokhbe12() {
        return nNokhbe12;
    }

    public void setnNokhbe12(BigInteger nNokhbe12) {
        this.nNokhbe12 = nNokhbe12;
    }

    public BigInteger getnNokhbe14() {
        return nNokhbe14;
    }

    public void setnNokhbe14(BigInteger nNokhbe14) {
        this.nNokhbe14 = nNokhbe14;
    }

    public BigInteger getnNokhbe18() {
        return nNokhbe18;
    }

    public void setnNokhbe18(BigInteger nNokhbe18) {
        this.nNokhbe18 = nNokhbe18;
    }

    public BigInteger getnMos53() {
        return nMos53;
    }

    public void setnMos53(BigInteger nMos53) {
        this.nMos53 = nMos53;
    }

    public BigInteger getnMos461() {
        return nMos461;
    }

    public void setnMos461(BigInteger nMos461) {
        this.nMos461 = nMos461;
    }

    public BigInteger getnMos462() {
        return nMos462;
    }

    public void setnMos462(BigInteger nMos462) {
        this.nMos462 = nMos462;
    }

    public BigInteger getnHardAmt495() {
        return nHardAmt495;
    }

    public void setnHardAmt495(BigInteger nHardAmt495) {
        this.nHardAmt495 = nHardAmt495;
    }

    public BigInteger getnHardMost495() {
        return nHardMost495;
    }

    public void setnHardMost495(BigInteger nHardMost495) {
        this.nHardMost495 = nHardMost495;
    }

    public BigInteger getnFani677() {
        return nFani677;
    }

    public void setnFani677(BigInteger nFani677) {
        this.nFani677 = nFani677;
    }

    public BigInteger getnEkh27() {
        return nEkh27;
    }

    public void setnEkh27(BigInteger nEkh27) {
        this.nEkh27 = nEkh27;
    }

    public BigInteger getPElami() {
        return pElami;
    }

    public void setPElami(BigInteger pElami) {
        this.pElami = pElami;
    }

    public BigInteger getNElami() {
        return nElami;
    }

    public void setNElami(BigInteger nElami) {
        this.nElami = nElami;
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

    public Long getKLhBn() {
        return kLhBn;
    }

    public void setKLhBn(Long kLhBn) {
        this.kLhBn = kLhBn;
    }

    public Long getSLhBn() {
        return sLhBn;
    }

    public void setSLhBn(Long sLhBn) {
        this.sLhBn = sLhBn;
    }

    public Long getKLhBh() {
        return kLhBh;
    }

    public void setKLhBh(Long kLhBh) {
        this.kLhBh = kLhBh;
    }

    public Long getSLhBh() {
        return sLhBh;
    }

    public void setSLhBh(Long sLhBh) {
        this.sLhBh = sLhBh;
    }

    public Long getSLnBh() {
        return sLnBh;
    }

    public void setSLnBh(Long sLnBh) {
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

    public Long getKNBik() {
        return kNBik;
    }

    public void setKNBik(Long kNBik) {
        this.kNBik = kNBik;
    }

    public Long getSNBik() {
        return sNBik;
    }

    public void setSNBik(Long sNBik) {
        this.sNBik = sNBik;
    }

    public Long getKHBik() {
        return kHBik;
    }

    public void setKHBik(Long kHBik) {
        this.kHBik = kHBik;
    }

    public Long getSHBik() {
        return sHBik;
    }

    public void setSHBik(Long sHBik) {
        this.sHBik = sHBik;
    }

    public Long getKNhBik() {
        return kNhBik;
    }

    public void setKNhBik(Long kNhBik) {
        this.kNhBik = kNhBik;
    }

    public Long getSNhBik() {
        return sNhBik;
    }

    public void setSNhBik(Long sNhBik) {
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

    public Long getNBimtemp() {
        return nBimtemp;
    }

    public void setNBimtemp(Long nBimtemp) {
        this.nBimtemp = nBimtemp;
    }

    public Long getNBimasli() {
        return nBimasli;
    }

    public void setNBimasli(Long nBimasli) {
        this.nBimasli = nBimasli;
    }

    public Long getPBld3() {
        return pBld3;
    }

    public void setPBld3(Long pBld3) {
        this.pBld3 = pBld3;
    }

    public Long getPBld4() {
        return pBld4;
    }

    public void setPBld4(Long pBld4) {
        this.pBld4 = pBld4;
    }

    public Long getPAzd01() {
        return pAzd01;
    }

    public void setPAzd01(Long pAzd01) {
        this.pAzd01 = pAzd01;
    }

    public Long getPAzd02() {
        return pAzd02;
    }

    public void setPAzd02(Long pAzd02) {
        this.pAzd02 = pAzd02;
    }

    public Long getPAzd03() {
        return pAzd03;
    }

    public void setPAzd03(Long pAzd03) {
        this.pAzd03 = pAzd03;
    }

    public Long getPEkh11() {
        return pEkh11;
    }

    public void setPEkh11(Long pEkh11) {
        this.pEkh11 = pEkh11;
    }

    public Long getPEkh12() {
        return pEkh12;
    }

    public void setPEkh12(Long pEkh12) {
        this.pEkh12 = pEkh12;
    }

    public Long getPEkh13() {
        return pEkh13;
    }

    public void setPEkh13(Long pEkh13) {
        this.pEkh13 = pEkh13;
    }

    public Long getDAzd01() {
        return dAzd01;
    }

    public void setDAzd01(Long dAzd01) {
        this.dAzd01 = dAzd01;
    }

    public Long getDAzd02() {
        return dAzd02;
    }

    public void setDAzd02(Long dAzd02) {
        this.dAzd02 = dAzd02;
    }

    public Long getDAzd03() {
        return dAzd03;
    }

    public void setDAzd03(Long dAzd03) {
        this.dAzd03 = dAzd03;
    }

    public Long getDEkh11() {
        return dEkh11;
    }

    public void setDEkh11(Long dEkh11) {
        this.dEkh11 = dEkh11;
    }

    public Long getDEkh12() {
        return dEkh12;
    }

    public void setDEkh12(Long dEkh12) {
        this.dEkh12 = dEkh12;
    }

    public Long getDEkh13() {
        return dEkh13;
    }

    public void setDEkh13(Long dEkh13) {
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

    public Long getPEkh14() {
        return pEkh14;
    }

    public void setPEkh14(Long pEkh14) {
        this.pEkh14 = pEkh14;
    }

    public Long getDEkh14() {
        return dEkh14;
    }

    public void setDEkh14(Long dEkh14) {
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

    public Long getPNev01() {
        return pNev01;
    }

    public void setPNev01(Long pNev01) {
        this.pNev01 = pNev01;
    }

    public Long getPNev02() {
        return pNev02;
    }

    public void setPNev02(Long pNev02) {
        this.pNev02 = pNev02;
    }

    public Long getPNev03() {
        return pNev03;
    }

    public void setPNev03(Long pNev03) {
        this.pNev03 = pNev03;
    }

    public Long getDNev01() {
        return dNev01;
    }

    public void setDNev01(Long dNev01) {
        this.dNev01 = dNev01;
    }

    public Long getDNev02() {
        return dNev02;
    }

    public void setDNev02(Long dNev02) {
        this.dNev02 = dNev02;
    }

    public Long getDNev03() {
        return dNev03;
    }

    public void setDNev03(Long dNev03) {
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

    public Long getXjanbd() {
        return xjanbd;
    }

    public void setXjanbd(Long xjanbd) {
        this.xjanbd = xjanbd;
    }

    public Long getYjanbd() {
        return yjanbd;
    }

    public void setYjanbd(Long yjanbd) {
        this.yjanbd = yjanbd;
    }

    public Long getSjanbd() {
        return sjanbd;
    }

    public void setSjanbd(Long sjanbd) {
        this.sjanbd = sjanbd;
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

    public BigInteger getInscntlre() {
        return inscntlre;
    }

    public void setInscntlre(BigInteger inscntlre) {
        this.inscntlre = inscntlre;
    }

    public BigInteger getInscntreq() {
        return inscntreq;
    }

    public void setInscntreq(BigInteger inscntreq) {
        this.inscntreq = inscntreq;
    }

    public BigInteger getInstyp1() {
        return instyp1;
    }

    public void setInstyp1(BigInteger instyp1) {
        this.instyp1 = instyp1;
    }

    public BigInteger getInstyp2() {
        return instyp2;
    }

    public void setInstyp2(BigInteger instyp2) {
        this.instyp2 = instyp2;
    }

    public BigInteger getInstyp3() {
        return instyp3;
    }

    public void setInstyp3(BigInteger instyp3) {
        this.instyp3 = instyp3;
    }

    public BigInteger getInstyp4() {
        return instyp4;
    }

    public void setInstyp4(BigInteger instyp4) {
        this.instyp4 = instyp4;
    }

    public BigInteger getInspym() {
        return inspym;
    }

    public void setInspym(BigInteger inspym) {
        this.inspym = inspym;
    }

    public BigInteger getInsnona() {
        return insnona;
    }

    public void setInsnona(BigInteger insnona) {
        this.insnona = insnona;
    }

    public BigInteger getNo84() {
        return no84;
    }

    public void setNo84(BigInteger no84) {
        this.no84 = no84;
    }

    public BigInteger getPNo84() {
        return pNo84;
    }

    public void setPNo84(BigInteger pNo84) {
        this.pNo84 = pNo84;
    }

    public BigInteger getNoEjra() {
        return noEjra;
    }

    public void setNoEjra(BigInteger noEjra) {
        this.noEjra = noEjra;
    }

    public BigInteger getNoFaal() {
        return noFaal;
    }

    public void setNoFaal(BigInteger noFaal) {
        this.noFaal = noFaal;
    }

    public BigInteger getMakhtom() {
        return makhtom;
    }

    public void setMakhtom(BigInteger makhtom) {
        this.makhtom = makhtom;
    }

    public BigInteger getKharej() {
        return kharej;
    }

    public void setKharej(BigInteger kharej) {
        this.kharej = kharej;
    }

    public BigInteger getKasrj() {
        return kasrj;
    }

    public void setKasrj(BigInteger kasrj) {
        this.kasrj = kasrj;
    }

    public BigInteger getNo19() {
        return no19;
    }

    public void setNo19(BigInteger no19) {
        this.no19 = no19;
    }

    public BigInteger getNoWsh07() {
        return noWsh07;
    }

    public void setNoWsh07(BigInteger noWsh07) {
        this.noWsh07 = noWsh07;
    }

    public Long getC01() {
        return c01;
    }

    public void setC01(Long c01) {
        this.c01 = c01;
    }

    public BigInteger getAmount01() {
        return amount01;
    }

    public void setAmount01(BigInteger amount01) {
        this.amount01 = amount01;
    }

    public Long getC02() {
        return c02;
    }

    public void setC02(Long c02) {
        this.c02 = c02;
    }

    public BigInteger getAmount02() {
        return amount02;
    }

    public void setAmount02(BigInteger amount02) {
        this.amount02 = amount02;
    }

    public Long getC04() {
        return c04;
    }

    public void setC04(Long c04) {
        this.c04 = c04;
    }

    public BigInteger getAmount04() {
        return amount04;
    }

    public void setAmount04(BigInteger amount04) {
        this.amount04 = amount04;
    }

    public Long getC07() {
        return c07;
    }

    public void setC07(Long c07) {
        this.c07 = c07;
    }

    public BigInteger getAmount07() {
        return amount07;
    }

    public void setAmount07(BigInteger amount07) {
        this.amount07 = amount07;
    }

    public Long getC08() {
        return c08;
    }

    public void setC08(Long c08) {
        this.c08 = c08;
    }

    public BigInteger getAmount08() {
        return amount08;
    }

    public void setAmount08(BigInteger amount08) {
        this.amount08 = amount08;
    }

    public Long getC16() {
        return c16;
    }

    public void setC16(Long c16) {
        this.c16 = c16;
    }

    public BigInteger getAmount16() {
        return amount16;
    }

    public void setAmount16(BigInteger amount16) {
        this.amount16 = amount16;
    }

    public Long getPayAzad3() {
        return payAzad3;
    }

    public void setPayAzad3(Long payAzad3) {
        this.payAzad3 = payAzad3;
    }

    public Long getDMad01() {
        return dMad01;
    }

    public void setDMad01(Long dMad01) {
        this.dMad01 = dMad01;
    }

    public Long getDMad02() {
        return dMad02;
    }

    public void setDMad02(Long dMad02) {
        this.dMad02 = dMad02;
    }

    public Long getDMad03() {
        return dMad03;
    }

    public void setDMad03(Long dMad03) {
        this.dMad03 = dMad03;
    }

    public Long getPMad01() {
        return pMad01;
    }

    public void setPMad01(Long pMad01) {
        this.pMad01 = pMad01;
    }

    public Long getPMad02() {
        return pMad02;
    }

    public void setPMad02(Long pMad02) {
        this.pMad02 = pMad02;
    }

    public Long getPMad03() {
        return pMad03;
    }

    public void setPMad03(Long pMad03) {
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

    public Long getPEkh15() {
        return pEkh15;
    }

    public void setPEkh15(Long pEkh15) {
        this.pEkh15 = pEkh15;
    }

    public Long getDEkh15() {
        return dEkh15;
    }

    public void setDEkh15(Long dEkh15) {
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

    public BigInteger getPShd01() {
        return pShd01;
    }

    public void setPShd01(BigInteger pShd01) {
        this.pShd01 = pShd01;
    }

    public BigInteger getPShd02() {
        return pShd02;
    }

    public void setPShd02(BigInteger pShd02) {
        this.pShd02 = pShd02;
    }

    public BigInteger getPShd03() {
        return pShd03;
    }

    public void setPShd03(BigInteger pShd03) {
        this.pShd03 = pShd03;
    }

    public BigInteger getDShd01() {
        return dShd01;
    }

    public void setDShd01(BigInteger dShd01) {
        this.dShd01 = dShd01;
    }

    public BigInteger getDShd02() {
        return dShd02;
    }

    public void setDShd02(BigInteger dShd02) {
        this.dShd02 = dShd02;
    }

    public BigInteger getDShd03() {
        return dShd03;
    }

    public void setDShd03(BigInteger dShd03) {
        this.dShd03 = dShd03;
    }

    public BigInteger getShd12() {
        return shd12;
    }

    public void setShd12(BigInteger shd12) {
        this.shd12 = shd12;
    }

    public BigInteger getShd14() {
        return shd14;
    }

    public void setShd14(BigInteger shd14) {
        this.shd14 = shd14;
    }

    public BigInteger getShd18() {
        return shd18;
    }

    public void setShd18(BigInteger shd18) {
        this.shd18 = shd18;
    }

    public BigInteger getPayShd() {
        return payShd;
    }

    public void setPayShd(BigInteger payShd) {
        this.payShd = payShd;
    }

    public BigInteger getTransk() {
        return transk;
    }

    public void setTransk(BigInteger transk) {
        this.transk = transk;
    }

    public BigInteger getTrans() {
        return trans;
    }

    public void setTrans(BigInteger trans) {
        this.trans = trans;
    }

    public BigInteger getTranskD() {
        return transkD;
    }

    public void setTranskD(BigInteger transkD) {
        this.transkD = transkD;
    }

    public BigInteger getTranskB() {
        return transkB;
    }

    public void setTranskB(BigInteger transkB) {
        this.transkB = transkB;
    }

    public BigInteger getTranskK() {
        return transkK;
    }

    public void setTranskK(BigInteger transkK) {
        this.transkK = transkK;
    }

    public BigInteger getTransD() {
        return transD;
    }

    public void setTransD(BigInteger transD) {
        this.transD = transD;
    }

    public BigInteger getTransB() {
        return transB;
    }

    public void setTransB(BigInteger transB) {
        this.transB = transB;
    }

    public BigInteger getTransK() {
        return transK;
    }

    public void setTransK(BigInteger transK) {
        this.transK = transK;
    }

    public BigInteger getMost87() {
        return most87;
    }

    public void setMost87(BigInteger most87) {
        this.most87 = most87;
    }

    public BigInteger getMostd87() {
        return mostd87;
    }

    public void setMostd87(BigInteger mostd87) {
        this.mostd87 = mostd87;
    }

    public BigInteger getMostmd87() {
        return mostmd87;
    }

    public void setMostmd87(BigInteger mostmd87) {
        this.mostmd87 = mostmd87;
    }

    public BigInteger getTranD() {
        return tranD;
    }

    public void setTranD(BigInteger tranD) {
        this.tranD = tranD;
    }

    public BigInteger getTranBim() {
        return tranBim;
    }

    public void setTranBim(BigInteger tranBim) {
        this.tranBim = tranBim;
    }

    public BigInteger getTtrans() {
        return ttrans;
    }

    public void setTtrans(BigInteger ttrans) {
        this.ttrans = ttrans;
    }

    public BigInteger getMostb87() {
        return mostb87;
    }

    public void setMostb87(BigInteger mostb87) {
        this.mostb87 = mostb87;
    }

    public BigInteger getMostdb87() {
        return mostdb87;
    }

    public void setMostdb87(BigInteger mostdb87) {
        this.mostdb87 = mostdb87;
    }

    public BigInteger getNimoshr() {
        return nimoshr;
    }

    public void setNimoshr(BigInteger nimoshr) {
        this.nimoshr = nimoshr;
    }

    public BigInteger getNnimoshr() {
        return nnimoshr;
    }

    public void setNnimoshr(BigInteger nnimoshr) {
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

    public BigInteger getLastdbt() {
        return lastdbt;
    }

    public void setLastdbt(BigInteger lastdbt) {
        this.lastdbt = lastdbt;
    }

    public BigInteger getCurdbt() {
        return curdbt;
    }

    public void setCurdbt(BigInteger curdbt) {
        this.curdbt = curdbt;
    }

    public BigInteger getPermet() {
        return permet;
    }

    public void setPermet(BigInteger permet) {
        this.permet = permet;
    }

    public BigInteger getCurmet() {
        return curmet;
    }

    public void setCurmet(BigInteger curmet) {
        this.curmet = curmet;
    }

    public BigInteger getCntcmf() {
        return cntcmf;
    }

    public void setCntcmf(BigInteger cntcmf) {
        this.cntcmf = cntcmf;
    }

    public BigInteger getCntcnl() {
        return cntcnl;
    }

    public void setCntcnl(BigInteger cntcnl) {
        this.cntcnl = cntcnl;
    }

    public BigInteger getGharar() {
        return gharar;
    }

    public void setGharar(BigInteger gharar) {
        this.gharar = gharar;
    }

    public BigInteger getTajdbt() {
        return tajdbt;
    }

    public void setTajdbt(BigInteger tajdbt) {
        this.tajdbt = tajdbt;
    }

    public BigInteger getBadvwait() {
        return badvwait;
    }

    public void setBadvwait(BigInteger badvwait) {
        this.badvwait = badvwait;
    }

    public BigInteger getVotewait() {
        return votewait;
    }

    public void setVotewait(BigInteger votewait) {
        this.votewait = votewait;
    }

    public BigInteger getBadvgharar() {
        return badvgharar;
    }

    public void setBadvgharar(BigInteger badvgharar) {
        this.badvgharar = badvgharar;
    }

    public BigInteger getBadvcalc() {
        return badvcalc;
    }

    public void setBadvcalc(BigInteger badvcalc) {
        this.badvcalc = badvcalc;
    }

    public BigInteger getTajdwait() {
        return tajdwait;
    }

    public void setTajdwait(BigInteger tajdwait) {
        this.tajdwait = tajdwait;
    }

    public BigInteger getTajdgharar() {
        return tajdgharar;
    }

    public void setTajdgharar(BigInteger tajdgharar) {
        this.tajdgharar = tajdgharar;
    }

    public BigInteger getTajdcalc() {
        return tajdcalc;
    }

    public void setTajdcalc(BigInteger tajdcalc) {
        this.tajdcalc = tajdcalc;
    }

    public BigInteger getBldKt() {
        return bldKt;
    }

    public void setBldKt(BigInteger bldKt) {
        this.bldKt = bldKt;
    }

    public BigInteger getBldSz() {
        return bldSz;
    }

    public void setBldSz(BigInteger bldSz) {
        this.bldSz = bldSz;
    }

    public BigInteger getBldMhr() {
        return bldMhr;
    }

    public void setBldMhr(BigInteger bldMhr) {
        this.bldMhr = bldMhr;
    }

    public BigInteger getBldMt() {
        return bldMt;
    }

    public void setBldMt(BigInteger bldMt) {
        this.bldMt = bldMt;
    }

    public BigInteger getBldRst() {
        return bldRst;
    }

    public void setBldRst(BigInteger bldRst) {
        this.bldRst = bldRst;
    }

    public BigInteger getNbldKt() {
        return nbldKt;
    }

    public void setNbldKt(BigInteger nbldKt) {
        this.nbldKt = nbldKt;
    }

    public BigInteger getNbldSz() {
        return nbldSz;
    }

    public void setNbldSz(BigInteger nbldSz) {
        this.nbldSz = nbldSz;
    }

    public BigInteger getNbldMhr() {
        return nbldMhr;
    }

    public void setNbldMhr(BigInteger nbldMhr) {
        this.nbldMhr = nbldMhr;
    }

    public BigInteger getNbldMt() {
        return nbldMt;
    }

    public void setNbldMt(BigInteger nbldMt) {
        this.nbldMt = nbldMt;
    }

    public BigInteger getNbldRst() {
        return nbldRst;
    }

    public void setNbldRst(BigInteger nbldRst) {
        this.nbldRst = nbldRst;
    }

    public BigInteger getBazErfagh() {
        return bazErfagh;
    }

    public void setBazErfagh(BigInteger bazErfagh) {
        this.bazErfagh = bazErfagh;
    }

    public BigInteger getBimErfagh() {
        return bimErfagh;
    }

    public void setBimErfagh(BigInteger bimErfagh) {
        this.bimErfagh = bimErfagh;
    }

    public BigInteger getBldBim() {
        return bldBim;
    }

    public void setBldBim(BigInteger bldBim) {
        this.bldBim = bldBim;
    }

    public BigInteger getBldBimgvh() {
        return bldBimgvh;
    }

    public void setBldBimgvh(BigInteger bldBimgvh) {
        this.bldBimgvh = bldBimgvh;
    }

    public BigInteger getBldBimno() {
        return bldBimno;
    }

    public void setBldBimno(BigInteger bldBimno) {
        this.bldBimno = bldBimno;
    }

    public BigInteger getNmade66() {
        return nmade66;
    }

    public void setNmade66(BigInteger nmade66) {
        this.nmade66 = nmade66;
    }

    public BigInteger getHandBim1() {
        return handBim1;
    }

    public void setHandBim1(BigInteger handBim1) {
        this.handBim1 = handBim1;
    }

    public BigInteger getHandBim2() {
        return handBim2;
    }

    public void setHandBim2(BigInteger handBim2) {
        this.handBim2 = handBim2;
    }

    public BigInteger getHandBimno() {
        return handBimno;
    }

    public void setHandBimno(BigInteger handBimno) {
        this.handBimno = handBimno;
    }

    public BigInteger getHandBimgvh() {
        return handBimgvh;
    }

    public void setHandBimgvh(BigInteger handBimgvh) {
        this.handBimgvh = handBimgvh;
    }

    public BigInteger getAzad12() {
        return azad12;
    }

    public void setAzad12(BigInteger azad12) {
        this.azad12 = azad12;
    }

    public BigInteger getAzad14() {
        return azad14;
    }

    public void setAzad14(BigInteger azad14) {
        this.azad14 = azad14;
    }

    public BigInteger getAzad18() {
        return azad18;
    }

    public void setAzad18(BigInteger azad18) {
        this.azad18 = azad18;
    }

    public BigInteger getEkhn() {
        return ekhn;
    }

    public void setEkhn(BigInteger ekhn) {
        this.ekhn = ekhn;
    }

    public BigInteger getAzad12No() {
        return azad12No;
    }

    public void setAzad12No(BigInteger azad12No) {
        this.azad12No = azad12No;
    }

    public BigInteger getAzad14No() {
        return azad14No;
    }

    public void setAzad14No(BigInteger azad14No) {
        this.azad14No = azad14No;
    }

    public BigInteger getAzad18No() {
        return azad18No;
    }

    public void setAzad18No(BigInteger azad18No) {
        this.azad18No = azad18No;
    }

    public BigInteger getEkhnNo() {
        return ekhnNo;
    }

    public void setEkhnNo(BigInteger ekhnNo) {
        this.ekhnNo = ekhnNo;
    }

    public BigInteger getBim605() {
        return bim605;
    }

    public void setBim605(BigInteger bim605) {
        this.bim605 = bim605;
    }

    public BigInteger getBim605No() {
        return bim605No;
    }

    public void setBim605No(BigInteger bim605No) {
        this.bim605No = bim605No;
    }

    public BigInteger getElamiye() {
        return elamiye;
    }

    public void setElamiye(BigInteger elamiye) {
        this.elamiye = elamiye;
    }

    public BigInteger getNoElamiye() {
        return noElamiye;
    }

    public void setNoElamiye(BigInteger noElamiye) {
        this.noElamiye = noElamiye;
    }

    public BigInteger getPsnt8() {
        return psnt8;
    }

    public void setPsnt8(BigInteger psnt8) {
        this.psnt8 = psnt8;
    }

    public BigInteger getKpsnt8() {
        return kpsnt8;
    }

    public void setKpsnt8(BigInteger kpsnt8) {
        this.kpsnt8 = kpsnt8;
    }

    public BigInteger getTpsnt8() {
        return tpsnt8;
    }

    public void setTpsnt8(BigInteger tpsnt8) {
        this.tpsnt8 = tpsnt8;
    }

    public BigInteger getPsnt9() {
        return psnt9;
    }

    public void setPsnt9(BigInteger psnt9) {
        this.psnt9 = psnt9;
    }

    public BigInteger getKpsnt9() {
        return kpsnt9;
    }

    public void setKpsnt9(BigInteger kpsnt9) {
        this.kpsnt9 = kpsnt9;
    }

    public BigInteger getTpsnt9() {
        return tpsnt9;
    }

    public void setTpsnt9(BigInteger tpsnt9) {
        this.tpsnt9 = tpsnt9;
    }

    public BigInteger getPsnt10() {
        return psnt10;
    }

    public void setPsnt10(BigInteger psnt10) {
        this.psnt10 = psnt10;
    }

    public BigInteger getKpsnt10() {
        return kpsnt10;
    }

    public void setKpsnt10(BigInteger kpsnt10) {
        this.kpsnt10 = kpsnt10;
    }

    public BigInteger getTpsnt10() {
        return tpsnt10;
    }

    public void setTpsnt10(BigInteger tpsnt10) {
        this.tpsnt10 = tpsnt10;
    }

    public BigInteger getPsnt11() {
        return psnt11;
    }

    public void setPsnt11(BigInteger psnt11) {
        this.psnt11 = psnt11;
    }

    public BigInteger getKpsnt11() {
        return kpsnt11;
    }

    public void setKpsnt11(BigInteger kpsnt11) {
        this.kpsnt11 = kpsnt11;
    }

    public BigInteger getTpsnt11() {
        return tpsnt11;
    }

    public void setTpsnt11(BigInteger tpsnt11) {
        this.tpsnt11 = tpsnt11;
    }

    public BigInteger getPsnt12() {
        return psnt12;
    }

    public void setPsnt12(BigInteger psnt12) {
        this.psnt12 = psnt12;
    }

    public BigInteger getKpsnt12() {
        return kpsnt12;
    }

    public void setKpsnt12(BigInteger kpsnt12) {
        this.kpsnt12 = kpsnt12;
    }

    public BigInteger getTpsnt12() {
        return tpsnt12;
    }

    public void setTpsnt12(BigInteger tpsnt12) {
        this.tpsnt12 = tpsnt12;
    }

    public BigInteger getDdriveB1() {
        return ddriveB1;
    }

    public void setDdriveB1(BigInteger ddriveB1) {
        this.ddriveB1 = ddriveB1;
    }

    public BigInteger getDdriveB2() {
        return ddriveB2;
    }

    public void setDdriveB2(BigInteger ddriveB2) {
        this.ddriveB2 = ddriveB2;
    }

    public BigInteger getDdriveS1() {
        return ddriveS1;
    }

    public void setDdriveS1(BigInteger ddriveS1) {
        this.ddriveS1 = ddriveS1;
    }

    public BigInteger getDdriveS2() {
        return ddriveS2;
    }

    public void setDdriveS2(BigInteger ddriveS2) {
        this.ddriveS2 = ddriveS2;
    }

    public BigInteger getDdriveD1() {
        return ddriveD1;
    }

    public void setDdriveD1(BigInteger ddriveD1) {
        this.ddriveD1 = ddriveD1;
    }

    public BigInteger getDdriveD2() {
        return ddriveD2;
    }

    public void setDdriveD2(BigInteger ddriveD2) {
        this.ddriveD2 = ddriveD2;
    }

    public BigInteger getBdriveB1() {
        return bdriveB1;
    }

    public void setBdriveB1(BigInteger bdriveB1) {
        this.bdriveB1 = bdriveB1;
    }

    public BigInteger getBdriveB2() {
        return bdriveB2;
    }

    public void setBdriveB2(BigInteger bdriveB2) {
        this.bdriveB2 = bdriveB2;
    }

    public BigInteger getBdriveB3() {
        return bdriveB3;
    }

    public void setBdriveB3(BigInteger bdriveB3) {
        this.bdriveB3 = bdriveB3;
    }

    public BigInteger getBdriveS1() {
        return bdriveS1;
    }

    public void setBdriveS1(BigInteger bdriveS1) {
        this.bdriveS1 = bdriveS1;
    }

    public BigInteger getBdriveS2() {
        return bdriveS2;
    }

    public void setBdriveS2(BigInteger bdriveS2) {
        this.bdriveS2 = bdriveS2;
    }

    public BigInteger getBdriveS3() {
        return bdriveS3;
    }

    public void setBdriveS3(BigInteger bdriveS3) {
        this.bdriveS3 = bdriveS3;
    }

    public BigInteger getBdriveD1() {
        return bdriveD1;
    }

    public void setBdriveD1(BigInteger bdriveD1) {
        this.bdriveD1 = bdriveD1;
    }

    public BigInteger getBdriveD2() {
        return bdriveD2;
    }

    public void setBdriveD2(BigInteger bdriveD2) {
        this.bdriveD2 = bdriveD2;
    }

    public BigInteger getBdriveD3() {
        return bdriveD3;
    }

    public void setBdriveD3(BigInteger bdriveD3) {
        this.bdriveD3 = bdriveD3;
    }

    public BigInteger getNMost10() {
        return nMost10;
    }

    public void setNMost10(BigInteger nMost10) {
        this.nMost10 = nMost10;
    }

    public BigInteger getNbehzist() {
        return nbehzist;
    }

    public void setNbehzist(BigInteger nbehzist) {
        this.nbehzist = nbehzist;
    }

    public BigInteger getKbehzist() {
        return kbehzist;
    }

    public void setKbehzist(BigInteger kbehzist) {
        this.kbehzist = kbehzist;
    }

    public BigInteger getGovbehzist() {
        return govbehzist;
    }

    public void setGovbehzist(BigInteger govbehzist) {
        this.govbehzist = govbehzist;
    }

    public BigInteger getKomSar12() {
        return komSar12;
    }

    public void setKomSar12(BigInteger komSar12) {
        this.komSar12 = komSar12;
    }

    public BigInteger getKomSar14() {
        return komSar14;
    }

    public void setKomSar14(BigInteger komSar14) {
        this.komSar14 = komSar14;
    }

    public BigInteger getKomSar18() {
        return komSar18;
    }

    public void setKomSar18(BigInteger komSar18) {
        this.komSar18 = komSar18;
    }

    public BigInteger getKomMad12() {
        return komMad12;
    }

    public void setKomMad12(BigInteger komMad12) {
        this.komMad12 = komMad12;
    }

    public BigInteger getKomMad14() {
        return komMad14;
    }

    public void setKomMad14(BigInteger komMad14) {
        this.komMad14 = komMad14;
    }

    public BigInteger getKomMad18() {
        return komMad18;
    }

    public void setKomMad18(BigInteger komMad18) {
        this.komMad18 = komMad18;
    }

    public BigInteger getBehSar12() {
        return behSar12;
    }

    public void setBehSar12(BigInteger behSar12) {
        this.behSar12 = behSar12;
    }

    public BigInteger getBehSar14() {
        return behSar14;
    }

    public void setBehSar14(BigInteger behSar14) {
        this.behSar14 = behSar14;
    }

    public BigInteger getBehSar18() {
        return behSar18;
    }

    public void setBehSar18(BigInteger behSar18) {
        this.behSar18 = behSar18;
    }

    public BigInteger getBehMad12() {
        return behMad12;
    }

    public void setBehMad12(BigInteger behMad12) {
        this.behMad12 = behMad12;
    }

    public BigInteger getBehMad14() {
        return behMad14;
    }

    public void setBehMad14(BigInteger behMad14) {
        this.behMad14 = behMad14;
    }

    public BigInteger getBehMad18() {
        return behMad18;
    }

    public void setBehMad18(BigInteger behMad18) {
        this.behMad18 = behMad18;
    }

    public BigInteger getMahdM12() {
        return mahdM12;
    }

    public void setMahdM12(BigInteger mahdM12) {
        this.mahdM12 = mahdM12;
    }

    public BigInteger getMahdM14() {
        return mahdM14;
    }

    public void setMahdM14(BigInteger mahdM14) {
        this.mahdM14 = mahdM14;
    }

    public BigInteger getMahdM18() {
        return mahdM18;
    }

    public void setMahdM18(BigInteger mahdM18) {
        this.mahdM18 = mahdM18;
    }

    public BigInteger getNkomSar12() {
        return nkomSar12;
    }

    public void setNkomSar12(BigInteger nkomSar12) {
        this.nkomSar12 = nkomSar12;
    }

    public BigInteger getNkomSar14() {
        return nkomSar14;
    }

    public void setNkomSar14(BigInteger nkomSar14) {
        this.nkomSar14 = nkomSar14;
    }

    public BigInteger getNkomSar18() {
        return nkomSar18;
    }

    public void setNkomSar18(BigInteger nkomSar18) {
        this.nkomSar18 = nkomSar18;
    }

    public BigInteger getNkomMad12() {
        return nkomMad12;
    }

    public void setNkomMad12(BigInteger nkomMad12) {
        this.nkomMad12 = nkomMad12;
    }

    public BigInteger getNkomMad14() {
        return nkomMad14;
    }

    public void setNkomMad14(BigInteger nkomMad14) {
        this.nkomMad14 = nkomMad14;
    }

    public BigInteger getNkomMad18() {
        return nkomMad18;
    }

    public void setNkomMad18(BigInteger nkomMad18) {
        this.nkomMad18 = nkomMad18;
    }

    public BigInteger getNbehSar12() {
        return nbehSar12;
    }

    public void setNbehSar12(BigInteger nbehSar12) {
        this.nbehSar12 = nbehSar12;
    }

    public BigInteger getNbehSar14() {
        return nbehSar14;
    }

    public void setNbehSar14(BigInteger nbehSar14) {
        this.nbehSar14 = nbehSar14;
    }

    public BigInteger getNbehSar18() {
        return nbehSar18;
    }

    public void setNbehSar18(BigInteger nbehSar18) {
        this.nbehSar18 = nbehSar18;
    }

    public BigInteger getNbehMad12() {
        return nbehMad12;
    }

    public void setNbehMad12(BigInteger nbehMad12) {
        this.nbehMad12 = nbehMad12;
    }

    public BigInteger getNbehMad14() {
        return nbehMad14;
    }

    public void setNbehMad14(BigInteger nbehMad14) {
        this.nbehMad14 = nbehMad14;
    }

    public BigInteger getNbehMad18() {
        return nbehMad18;
    }

    public void setNbehMad18(BigInteger nbehMad18) {
        this.nbehMad18 = nbehMad18;
    }

    public BigInteger getNmahdM12() {
        return nmahdM12;
    }

    public void setNmahdM12(BigInteger nmahdM12) {
        this.nmahdM12 = nmahdM12;
    }

    public BigInteger getNmahdM14() {
        return nmahdM14;
    }

    public void setNmahdM14(BigInteger nmahdM14) {
        this.nmahdM14 = nmahdM14;
    }

    public BigInteger getNmahdM18() {
        return nmahdM18;
    }

    public void setNmahdM18(BigInteger nmahdM18) {
        this.nmahdM18 = nmahdM18;
    }

    public BigInteger getHadaf37() {
        return hadaf37;
    }

    public void setHadaf37(BigInteger hadaf37) {
        this.hadaf37 = hadaf37;
    }

    public BigInteger getNbehzist1() {
        return nbehzist1;
    }

    public void setNbehzist1(BigInteger nbehzist1) {
        this.nbehzist1 = nbehzist1;
    }

    public BigInteger getKbehzist1() {
        return kbehzist1;
    }

    public void setKbehzist1(BigInteger kbehzist1) {
        this.kbehzist1 = kbehzist1;
    }

    public BigInteger getGovbehzist1() {
        return govbehzist1;
    }

    public void setGovbehzist1(BigInteger govbehzist1) {
        this.govbehzist1 = govbehzist1;
    }

    public BigInteger getKgovbehzist() {
        return kgovbehzist;
    }

    public void setKgovbehzist(BigInteger kgovbehzist) {
        this.kgovbehzist = kgovbehzist;
    }

    public BigInteger getKgovbehzist1() {
        return kgovbehzist1;
    }

    public void setKgovbehzist1(BigInteger kgovbehzist1) {
        this.kgovbehzist1 = kgovbehzist1;
    }

    public BigInteger getDdrive1() {
        return ddrive1;
    }

    public void setDdrive1(BigInteger ddrive1) {
        this.ddrive1 = ddrive1;
    }

    public BigInteger getDdrive2() {
        return ddrive2;
    }

    public void setDdrive2(BigInteger ddrive2) {
        this.ddrive2 = ddrive2;
    }

    public BigInteger getEsaratAzadd() {
        return esaratAzadd;
    }

    public void setEsaratAzadd(BigInteger esaratAzadd) {
        this.esaratAzadd = esaratAzadd;
    }

    public BigInteger getJangJanbd() {
        return jangJanbd;
    }

    public void setJangJanbd(BigInteger jangJanbd) {
        this.jangJanbd = jangJanbd;
    }

    public BigInteger getEsaratD() {
        return esaratD;
    }

    public void setEsaratD(BigInteger esaratD) {
        this.esaratD = esaratD;
    }

    public BigInteger getAzadeganD() {
        return azadeganD;
    }

    public void setAzadeganD(BigInteger azadeganD) {
        this.azadeganD = azadeganD;
    }

    public BigInteger getJangJanbd3() {
        return jangJanbd3;
    }

    public void setJangJanbd3(BigInteger jangJanbd3) {
        this.jangJanbd3 = jangJanbd3;
    }

    public BigInteger getEsaratAzadk() {
        return esaratAzadk;
    }

    public void setEsaratAzadk(BigInteger esaratAzadk) {
        this.esaratAzadk = esaratAzadk;
    }

    public BigInteger getJangJanbk() {
        return jangJanbk;
    }

    public void setJangJanbk(BigInteger jangJanbk) {
        this.jangJanbk = jangJanbk;
    }

    public BigInteger getJangJanbk3() {
        return jangJanbk3;
    }

    public void setJangJanbk3(BigInteger jangJanbk3) {
        this.jangJanbk3 = jangJanbk3;
    }

    public BigInteger getNesaratAzadd() {
        return nesaratAzadd;
    }

    public void setNesaratAzadd(BigInteger nesaratAzadd) {
        this.nesaratAzadd = nesaratAzadd;
    }

    public BigInteger getNjangJanbd() {
        return njangJanbd;
    }

    public void setNjangJanbd(BigInteger njangJanbd) {
        this.njangJanbd = njangJanbd;
    }

    public BigInteger getNesaratD() {
        return nesaratD;
    }

    public void setNesaratD(BigInteger nesaratD) {
        this.nesaratD = nesaratD;
    }

    public BigInteger getNazadeganD() {
        return nazadeganD;
    }

    public void setNazadeganD(BigInteger nazadeganD) {
        this.nazadeganD = nazadeganD;
    }

    public BigInteger getNjangJanbd3() {
        return njangJanbd3;
    }

    public void setNjangJanbd3(BigInteger njangJanbd3) {
        this.njangJanbd3 = njangJanbd3;
    }

    public BigInteger getNesaratAzadk() {
        return nesaratAzadk;
    }

    public void setNesaratAzadk(BigInteger nesaratAzadk) {
        this.nesaratAzadk = nesaratAzadk;
    }

    public BigInteger getNjangJanbk() {
        return njangJanbk;
    }

    public void setNjangJanbk(BigInteger njangJanbk) {
        this.njangJanbk = njangJanbk;
    }

    public BigInteger getNjangJanbk3() {
        return njangJanbk3;
    }

    public void setNjangJanbk3(BigInteger njangJanbk3) {
        this.njangJanbk3 = njangJanbk3;
    }

    public BigInteger getSayadan() {
        return sayadan;
    }

    public void setSayadan(BigInteger sayadan) {
        this.sayadan = sayadan;
    }

    public BigInteger getZanbordaran() {
        return zanbordaran;
    }

    public void setZanbordaran(BigInteger zanbordaran) {
        this.zanbordaran = zanbordaran;
    }

    public BigInteger getNsayad() {
        return nsayad;
    }

    public void setNsayad(BigInteger nsayad) {
        this.nsayad = nsayad;
    }

    public BigInteger getNzanbor() {
        return nzanbor;
    }

    public void setNzanbor(BigInteger nzanbor) {
        this.nzanbor = nzanbor;
    }

    public BigInteger getKomakzanbor() {
        return komakzanbor;
    }

    public void setKomakzanbor(BigInteger komakzanbor) {
        this.komakzanbor = komakzanbor;
    }

    public BigInteger getKomaksayad() {
        return komaksayad;
    }

    public void setKomaksayad(BigInteger komaksayad) {
        this.komaksayad = komaksayad;
    }

    public BigInteger getMost56() {
        return most56;
    }

    public void setMost56(BigInteger most56) {
        this.most56 = most56;
    }

    public BigInteger getNmost56() {
        return nmost56;
    }

    public void setNmost56(BigInteger nmost56) {
        this.nmost56 = nmost56;
    }

    public BigInteger getNkarfarma1() {
        return nkarfarma1;
    }

    public void setNkarfarma1(BigInteger nkarfarma1) {
        this.nkarfarma1 = nkarfarma1;
    }

    public BigInteger getKkarfarma1() {
        return kkarfarma1;
    }

    public void setKkarfarma1(BigInteger kkarfarma1) {
        this.kkarfarma1 = kkarfarma1;
    }

    public BigInteger getNkarfarma2() {
        return nkarfarma2;
    }

    public void setNkarfarma2(BigInteger nkarfarma2) {
        this.nkarfarma2 = nkarfarma2;
    }

    public BigInteger getKkarfarma2() {
        return kkarfarma2;
    }

    public void setKkarfarma2(BigInteger kkarfarma2) {
        this.kkarfarma2 = kkarfarma2;
    }

    public BigInteger getKgovkarfarma1() {
        return kgovkarfarma1;
    }

    public void setKgovkarfarma1(BigInteger kgovkarfarma1) {
        this.kgovkarfarma1 = kgovkarfarma1;
    }

    public BigInteger getPsnt13() {
        return psnt13;
    }

    public void setPsnt13(BigInteger psnt13) {
        this.psnt13 = psnt13;
    }

    public BigInteger getTpsnt13() {
        return tpsnt13;
    }

    public void setTpsnt13(BigInteger tpsnt13) {
        this.tpsnt13 = tpsnt13;
    }

    public BigInteger getKpsnt13() {
        return kpsnt13;
    }

    public void setKpsnt13(BigInteger kpsnt13) {
        this.kpsnt13 = kpsnt13;
    }

    public BigInteger getTpsnt14() {
        return tpsnt14;
    }

    public void setTpsnt14(BigInteger tpsnt14) {
        this.tpsnt14 = tpsnt14;
    }

    public BigInteger getKpsnt14() {
        return kpsnt14;
    }

    public void setKpsnt14(BigInteger kpsnt14) {
        this.kpsnt14 = kpsnt14;
    }

    public BigInteger getPsnt14() {
        return psnt14;
    }

    public void setPsnt14(BigInteger psnt14) {
        this.psnt14 = psnt14;
    }

    public BigInteger getTel() {
        return tel;
    }

    public void setTel(BigInteger tel) {
        this.tel = tel;
    }

    public BigInteger getAcc() {
        return acc;
    }

    public void setAcc(BigInteger acc) {
        this.acc = acc;
    }

    public BigInteger getAccres() {
        return accres;
    }

    public void setAccres(BigInteger accres) {
        this.accres = accres;
    }

    public BigInteger getRegingo() {
        return regingo;
    }

    public void setRegingo(BigInteger regingo) {
        this.regingo = regingo;
    }

    public BigInteger getRealpeople() {
        return realpeople;
    }

    public void setRealpeople(BigInteger realpeople) {
        this.realpeople = realpeople;
    }

    public BigInteger getLawpeople() {
        return lawpeople;
    }

    public void setLawpeople(BigInteger lawpeople) {
        this.lawpeople = lawpeople;
    }

    public BigInteger getEjra() {
        return ejra;
    }

    public void setEjra(BigInteger ejra) {
        this.ejra = ejra;
    }

    public BigInteger getAssign() {
        return assign;
    }

    public void setAssign(BigInteger assign) {
        this.assign = assign;
    }

    public BigInteger getPerson() {
        return person;
    }

    public void setPerson(BigInteger person) {
        this.person = person;
    }

    public BigInteger getStock() {
        return stock;
    }

    public void setStock(BigInteger stock) {
        this.stock = stock;
    }

    public BigInteger getGuaranty() {
        return guaranty;
    }

    public void setGuaranty(BigInteger guaranty) {
        this.guaranty = guaranty;
    }

    public BigInteger getAuction() {
        return auction;
    }

    public void setAuction(BigInteger auction) {
        this.auction = auction;
    }

    public BigInteger getAmval() {
        return amval;
    }

    public void setAmval(BigInteger amval) {
        this.amval = amval;
    }

    public BigInteger getEstate() {
        return estate;
    }

    public void setEstate(BigInteger estate) {
        this.estate = estate;
    }

    public BigInteger getAct() {
        return act;
    }

    public void setAct(BigInteger act) {
        this.act = act;
    }

    public BigInteger getDoctor() {
        return doctor;
    }

    public void setDoctor(BigInteger doctor) {
        this.doctor = doctor;
    }

    public BigInteger getChklaw() {
        return chklaw;
    }

    public void setChklaw(BigInteger chklaw) {
        this.chklaw = chklaw;
    }

    public BigInteger getRealins() {
        return realins;
    }

    public void setRealins(BigInteger realins) {
        this.realins = realins;
    }

    public BigInteger getLawins() {
        return lawins;
    }

    public void setLawins(BigInteger lawins) {
        this.lawins = lawins;
    }

    public BigInteger getEvalu() {
        return evalu;
    }

    public void setEvalu(BigInteger evalu) {
        this.evalu = evalu;
    }

    public BigInteger getWarn() {
        return warn;
    }

    public void setWarn(BigInteger warn) {
        this.warn = warn;
    }

    public BigInteger getProceed() {
        return proceed;
    }

    public void setProceed(BigInteger proceed) {
        this.proceed = proceed;
    }

    public BigInteger getNkarfarma3() {
        return nkarfarma3;
    }

    public void setNkarfarma3(BigInteger nkarfarma3) {
        this.nkarfarma3 = nkarfarma3;
    }

    public BigInteger getKkarfarma3() {
        return kkarfarma3;
    }

    public void setKkarfarma3(BigInteger kkarfarma3) {
        this.kkarfarma3 = kkarfarma3;
    }

    public BigInteger getCurnBakhshode() {
        return curnBakhshode;
    }

    public void setCurnBakhshode(BigInteger curnBakhshode) {
        this.curnBakhshode = curnBakhshode;
    }

    public BigInteger getLastBakhshode() {
        return lastBakhshode;
    }

    public void setLastBakhshode(BigInteger lastBakhshode) {
        this.lastBakhshode = lastBakhshode;
    }

    public BigInteger getCurnBikbakhshod() {
        return curnBikbakhshod;
    }

    public void setCurnBikbakhshod(BigInteger curnBikbakhshod) {
        this.curnBikbakhshod = curnBikbakhshod;
    }

    public BigInteger getLastBikbakhshod() {
        return lastBikbakhshod;
    }

    public void setLastBikbakhshod(BigInteger lastBikbakhshod) {
        this.lastBikbakhshod = lastBikbakhshod;
    }

    public BigInteger getJarimehBakhshod() {
        return jarimehBakhshod;
    }

    public void setJarimehBakhshod(BigInteger jarimehBakhshod) {
        this.jarimehBakhshod = jarimehBakhshod;
    }

    public BigInteger getBakhshode() {
        return bakhshode;
    }

    public void setBakhshode(BigInteger bakhshode) {
        this.bakhshode = bakhshode;
    }

    public BigInteger getBakhshodkar() {
        return bakhshodkar;
    }

    public void setBakhshodkar(BigInteger bakhshodkar) {
        this.bakhshodkar = bakhshodkar;
    }

    public BigInteger getNimoshrPr() {
        return nimoshrPr;
    }

    public void setNimoshrPr(BigInteger nimoshrPr) {
        this.nimoshrPr = nimoshrPr;
    }

    public BigInteger getNnimoshrPr() {
        return nnimoshrPr;
    }

    public void setNnimoshrPr(BigInteger nnimoshrPr) {
        this.nnimoshrPr = nnimoshrPr;
    }

    public BigInteger getMost564() {
        return most564;
    }

    public void setMost564(BigInteger most564) {
        this.most564 = most564;
    }

    public BigInteger getNmost564() {
        return nmost564;
    }

    public void setNmost564(BigInteger nmost564) {
        this.nmost564 = nmost564;
    }

    public BigInteger getPnh12() {
        return pnh12;
    }

    public void setPnh12(BigInteger pnh12) {
        this.pnh12 = pnh12;
    }

    public BigInteger getPnh14() {
        return pnh14;
    }

    public void setPnh14(BigInteger pnh14) {
        this.pnh14 = pnh14;
    }

    public BigInteger getPnh18() {
        return pnh18;
    }

    public void setPnh18(BigInteger pnh18) {
        this.pnh18 = pnh18;
    }

    public BigInteger getSPnh12() {
        return sPnh12;
    }

    public void setSPnh12(BigInteger sPnh12) {
        this.sPnh12 = sPnh12;
    }

    public BigInteger getSPnh14() {
        return sPnh14;
    }

    public void setSPnh14(BigInteger sPnh14) {
        this.sPnh14 = sPnh14;
    }

    public BigInteger getSPnh18() {
        return sPnh18;
    }

    public void setSPnh18(BigInteger sPnh18) {
        this.sPnh18 = sPnh18;
    }

    public BigInteger getKPnh12() {
        return kPnh12;
    }

    public void setKPnh12(BigInteger kPnh12) {
        this.kPnh12 = kPnh12;
    }

    public BigInteger getKPnh14() {
        return kPnh14;
    }

    public void setKPnh14(BigInteger kPnh14) {
        this.kPnh14 = kPnh14;
    }

    public BigInteger getKPnh18() {
        return kPnh18;
    }

    public void setKPnh18(BigInteger kPnh18) {
        this.kPnh18 = kPnh18;
    }

    public BigInteger getKSPnh12() {
        return kSPnh12;
    }

    public void setKSPnh12(BigInteger kSPnh12) {
        this.kSPnh12 = kSPnh12;
    }

    public BigInteger getKSPnh14() {
        return kSPnh14;
    }

    public void setKSPnh14(BigInteger kSPnh14) {
        this.kSPnh14 = kSPnh14;
    }

    public BigInteger getKSPnh18() {
        return kSPnh18;
    }

    public void setKSPnh18(BigInteger kSPnh18) {
        this.kSPnh18 = kSPnh18;
    }

    public BigInteger getNoPnh12() {
        return noPnh12;
    }

    public void setNoPnh12(BigInteger noPnh12) {
        this.noPnh12 = noPnh12;
    }

    public BigInteger getNoPnh14() {
        return noPnh14;
    }

    public void setNoPnh14(BigInteger noPnh14) {
        this.noPnh14 = noPnh14;
    }

    public BigInteger getNoPnh18() {
        return noPnh18;
    }

    public void setNoPnh18(BigInteger noPnh18) {
        this.noPnh18 = noPnh18;
    }

    public BigInteger getHesabresiV() {
        return hesabresiV;
    }

    public void setHesabresiV(BigInteger hesabresiV) {
        this.hesabresiV = hesabresiV;
    }

    public BigInteger getHesabresiVNo() {
        return hesabresiVNo;
    }

    public void setHesabresiVNo(BigInteger hesabresiVNo) {
        this.hesabresiVNo = hesabresiVNo;
    }

    public BigInteger getCurnBakhshodeN() {
        return curnBakhshodeN;
    }

    public void setCurnBakhshodeN(BigInteger curnBakhshodeN) {
        this.curnBakhshodeN = curnBakhshodeN;
    }

    public BigInteger getLastBakhshodeN() {
        return lastBakhshodeN;
    }

    public void setLastBakhshodeN(BigInteger lastBakhshodeN) {
        this.lastBakhshodeN = lastBakhshodeN;
    }

    public BigInteger getCurnBikbakhshodN() {
        return curnBikbakhshodN;
    }

    public void setCurnBikbakhshodN(BigInteger curnBikbakhshodN) {
        this.curnBikbakhshodN = curnBikbakhshodN;
    }

    public BigInteger getLastBikbakhshodN() {
        return lastBikbakhshodN;
    }

    public void setLastBikbakhshodN(BigInteger lastBikbakhshodN) {
        this.lastBikbakhshodN = lastBikbakhshodN;
    }

    public BigInteger getJarimehBakhshodN() {
        return jarimehBakhshodN;
    }

    public void setJarimehBakhshodN(BigInteger jarimehBakhshodN) {
        this.jarimehBakhshodN = jarimehBakhshodN;
    }

    public BigInteger getBakhshodeN() {
        return bakhshodeN;
    }

    public void setBakhshodeN(BigInteger bakhshodeN) {
        this.bakhshodeN = bakhshodeN;
    }

    public BigInteger getBakhshodkarN() {
        return bakhshodkarN;
    }

    public void setBakhshodkarN(BigInteger bakhshodkarN) {
        this.bakhshodkarN = bakhshodkarN;
    }

    public BigInteger getNimoshrPrN() {
        return nimoshrPrN;
    }

    public void setNimoshrPrN(BigInteger nimoshrPrN) {
        this.nimoshrPrN = nimoshrPrN;
    }

    public BigInteger getNnimoshrPrN() {
        return nnimoshrPrN;
    }

    public void setNnimoshrPrN(BigInteger nnimoshrPrN) {
        this.nnimoshrPrN = nnimoshrPrN;
    }

    public BigInteger getNdarkhastBakhshodeh() {
        return ndarkhastBakhshodeh;
    }

    public void setNdarkhastBakhshodeh(BigInteger ndarkhastBakhshodeh) {
        this.ndarkhastBakhshodeh = ndarkhastBakhshodeh;
    }

    public BigInteger getInswsh1Rs() {
        return inswsh1Rs;
    }

    public void setInswsh1Rs(BigInteger inswsh1Rs) {
        this.inswsh1Rs = inswsh1Rs;
    }

    public BigInteger getInswsh2Rs() {
        return inswsh2Rs;
    }

    public void setInswsh2Rs(BigInteger inswsh2Rs) {
        this.inswsh2Rs = inswsh2Rs;
    }

    public BigInteger getInswsh3Rs() {
        return inswsh3Rs;
    }

    public void setInswsh3Rs(BigInteger inswsh3Rs) {
        this.inswsh3Rs = inswsh3Rs;
    }

    public BigInteger getInswsh4Rs() {
        return inswsh4Rs;
    }

    public void setInswsh4Rs(BigInteger inswsh4Rs) {
        this.inswsh4Rs = inswsh4Rs;
    }

    public BigInteger getInswshTotalRs() {
        return inswshTotalRs;
    }

    public void setInswshTotalRs(BigInteger inswshTotalRs) {
        this.inswshTotalRs = inswshTotalRs;
    }

    public BigInteger getMost65() {
        return most65;
    }

    public void setMost65(BigInteger most65) {
        this.most65 = most65;
    }

    public BigInteger getNmost65() {
        return nmost65;
    }

    public void setNmost65(BigInteger nmost65) {
        this.nmost65 = nmost65;
    }

    public BigInteger getFundtmpKar() {
        return fundtmpKar;
    }

    public void setFundtmpKar(BigInteger fundtmpKar) {
        this.fundtmpKar = fundtmpKar;
    }

    public BigInteger getNFundtmpKar() {
        return nFundtmpKar;
    }

    public void setNFundtmpKar(BigInteger nFundtmpKar) {
        this.nFundtmpKar = nFundtmpKar;
    }

    public BigInteger getConfirmAmt() {
        return confirmAmt;
    }

    public void setConfirmAmt(BigInteger confirmAmt) {
        this.confirmAmt = confirmAmt;
    }

    public BigInteger getNConfirmAmt() {
        return nConfirmAmt;
    }

    public void setNConfirmAmt(BigInteger nConfirmAmt) {
        this.nConfirmAmt = nConfirmAmt;
    }

    public BigInteger getRefundAmt() {
        return refundAmt;
    }

    public void setRefundAmt(BigInteger refundAmt) {
        this.refundAmt = refundAmt;
    }

    public BigInteger getNRefundAmt() {
        return nRefundAmt;
    }

    public void setNRefundAmt(BigInteger nRefundAmt) {
        this.nRefundAmt = nRefundAmt;
    }

    public BigInteger getCurkarfarma() {
        return curkarfarma;
    }

    public void setCurkarfarma(BigInteger curkarfarma) {
        this.curkarfarma = curkarfarma;
    }

    public BigInteger getCurdolat() {
        return curdolat;
    }

    public void setCurdolat(BigInteger curdolat) {
        this.curdolat = curdolat;
    }

    public BigInteger getMost100() {
        return most100;
    }

    public void setMost100(BigInteger most100) {
        this.most100 = most100;
    }

    public BigInteger getNCurkarfarma() {
        return nCurkarfarma;
    }

    public void setNCurkarfarma(BigInteger nCurkarfarma) {
        this.nCurkarfarma = nCurkarfarma;
    }

    public BigInteger getNCurdolat() {
        return nCurdolat;
    }

    public void setNCurdolat(BigInteger nCurdolat) {
        this.nCurdolat = nCurdolat;
    }

    public BigInteger getNMost100() {
        return nMost100;
    }

    public void setNMost100(BigInteger nMost100) {
        this.nMost100 = nMost100;
    }

    public BigInteger getHardAmt495() {
        return hardAmt495;
    }

    public void setHardAmt495(BigInteger hardAmt495) {
        this.hardAmt495 = hardAmt495;
    }

    public BigInteger getHardMost495() {
        return hardMost495;
    }

    public void setHardMost495(BigInteger hardMost495) {
        this.hardMost495 = hardMost495;
    }

    public BigInteger getAmtbed() {
        return amtbed;
    }

    public void setAmtbed(BigInteger amtbed) {
        this.amtbed = amtbed;
    }

    public BigInteger getAmtbedm() {
        return amtbedm;
    }

    public void setAmtbedm(BigInteger amtbedm) {
        this.amtbedm = amtbedm;
    }

    public BigInteger getIranOuter14() {
        return iranOuter14;
    }

    public void setIranOuter14(BigInteger iranOuter14) {
        this.iranOuter14 = iranOuter14;
    }

    public BigInteger getIranOuter18() {
        return iranOuter18;
    }

    public void setIranOuter18(BigInteger iranOuter18) {
        this.iranOuter18 = iranOuter18;
    }

    public BigInteger getIranOuterDarman() {
        return iranOuterDarman;
    }

    public void setIranOuterDarman(BigInteger iranOuterDarman) {
        this.iranOuterDarman = iranOuterDarman;
    }

    public BigInteger getNIranOuter14() {
        return nIranOuter14;
    }

    public void setNIranOuter14(BigInteger nIranOuter14) {
        this.nIranOuter14 = nIranOuter14;
    }

    public BigInteger getNIranOuter18() {
        return nIranOuter18;
    }

    public void setNIranOuter18(BigInteger nIranOuter18) {
        this.nIranOuter18 = nIranOuter18;
    }

    public BigInteger getNIranOuterDarman() {
        return nIranOuterDarman;
    }

    public void setNIranOuterDarman(BigInteger nIranOuterDarman) {
        this.nIranOuterDarman = nIranOuterDarman;
    }

    public BigInteger getNMost1894() {
        return nMost1894;
    }

    public void setNMost1894(BigInteger nMost1894) {
        this.nMost1894 = nMost1894;
    }

    public BigInteger getMost1894() {
        return most1894;
    }

    public void setMost1894(BigInteger most1894) {
        this.most1894 = most1894;
    }

    public BigInteger getKEnKosor() {
        return kEnKosor;
    }

    public void setKEnKosor(BigInteger kEnKosor) {
        this.kEnKosor = kEnKosor;
    }

    public BigInteger getNEnKosor() {
        return nEnKosor;
    }

    public void setNEnKosor(BigInteger nEnKosor) {
        this.nEnKosor = nEnKosor;
    }

    public BigInteger getKarMRostaii() {
        return karMRostaii;
    }

    public void setKarMRostaii(BigInteger karMRostaii) {
        this.karMRostaii = karMRostaii;
    }

    public BigInteger getNKarMRostaii() {
        return nKarMRostaii;
    }

    public void setNKarMRostaii(BigInteger nKarMRostaii) {
        this.nKarMRostaii = nKarMRostaii;
    }

    public BigInteger getConfirmAmt1() {
        return confirmAmt1;
    }

    public void setConfirmAmt1(BigInteger confirmAmt1) {
        this.confirmAmt1 = confirmAmt1;
    }

    public BigInteger getVVosolhesab() {
        return vVosolhesab;
    }

    public void setVVosolhesab(BigInteger vVosolhesab) {
        this.vVosolhesab = vVosolhesab;
    }

    public BigInteger getVCnthesab() {
        return vCnthesab;
    }

    public void setVCnthesab(BigInteger vCnthesab) {
        this.vCnthesab = vCnthesab;
    }

    public BigInteger getRcsChqno96() {
        return rcsChqno96;
    }

    public void setRcsChqno96(BigInteger rcsChqno96) {
        this.rcsChqno96 = rcsChqno96;
    }

    public BigInteger getRcsChqamt96() {
        return rcsChqamt96;
    }

    public void setRcsChqamt96(BigInteger rcsChqamt96) {
        this.rcsChqamt96 = rcsChqamt96;
    }

    public BigInteger getNokhbe12() {
        return nokhbe12;
    }

    public void setNokhbe12(BigInteger nokhbe12) {
        this.nokhbe12 = nokhbe12;
    }

    public BigInteger getNokhbe14() {
        return nokhbe14;
    }

    public void setNokhbe14(BigInteger nokhbe14) {
        this.nokhbe14 = nokhbe14;
    }

    public BigInteger getNokhbe18() {
        return nokhbe18;
    }

    public void setNokhbe18(BigInteger nokhbe18) {
        this.nokhbe18 = nokhbe18;
    }

    public BigInteger getNNokhbe12() {
        return nNokhbe12;
    }

    public void setNNokhbe12(BigInteger nNokhbe12) {
        this.nNokhbe12 = nNokhbe12;
    }

    public BigInteger getNNokhbe14() {
        return nNokhbe14;
    }

    public void setNNokhbe14(BigInteger nNokhbe14) {
        this.nNokhbe14 = nNokhbe14;
    }

    public BigInteger getNNokhbe18() {
        return nNokhbe18;
    }

    public void setNNokhbe18(BigInteger nNokhbe18) {
        this.nNokhbe18 = nNokhbe18;
    }

    public BigInteger getBakhshodekarNBefore() {
        return bakhshodekarNBefore;
    }

    public void setBakhshodekarNBefore(BigInteger bakhshodekarNBefore) {
        this.bakhshodekarNBefore = bakhshodekarNBefore;
    }

    public BigInteger getBakhshodekarNAfter() {
        return bakhshodekarNAfter;
    }

    public void setBakhshodekarNAfter(BigInteger bakhshodekarNAfter) {
        this.bakhshodekarNAfter = bakhshodekarNAfter;
    }

    public BigInteger getBakhshodeNBefore() {
        return bakhshodeNBefore;
    }

    public void setBakhshodeNBefore(BigInteger bakhshodeNBefore) {
        this.bakhshodeNBefore = bakhshodeNBefore;
    }

    public BigInteger getBakhshodeNAfter() {
        return bakhshodeNAfter;
    }

    public void setBakhshodeNAfter(BigInteger bakhshodeNAfter) {
        this.bakhshodeNAfter = bakhshodeNAfter;
    }

    public BigInteger getNimoshrPrAfter() {
        return nimoshrPrAfter;
    }

    public void setNimoshrPrAfter(BigInteger nimoshrPrAfter) {
        this.nimoshrPrAfter = nimoshrPrAfter;
    }

    public BigInteger getNnimoshrPrAfter() {
        return nnimoshrPrAfter;
    }

    public void setNnimoshrPrAfter(BigInteger nnimoshrPrAfter) {
        this.nnimoshrPrAfter = nnimoshrPrAfter;
    }

    public BigInteger getLastBikbakhshodAfter() {
        return lastBikbakhshodAfter;
    }

    public void setLastBikbakhshodAfter(BigInteger lastBikbakhshodAfter) {
        this.lastBikbakhshodAfter = lastBikbakhshodAfter;
    }

    public BigInteger getJarimehBakhshodAfter() {
        return jarimehBakhshodAfter;
    }

    public void setJarimehBakhshodAfter(BigInteger jarimehBakhshodAfter) {
        this.jarimehBakhshodAfter = jarimehBakhshodAfter;
    }

    public BigInteger getLastBakhshodeAfter() {
        return lastBakhshodeAfter;
    }

    public void setLastBakhshodeAfter(BigInteger lastBakhshodeAfter) {
        this.lastBakhshodeAfter = lastBakhshodeAfter;
    }

    public BigInteger getNnimoshrPrBefore() {
        return nnimoshrPrBefore;
    }

    public void setNnimoshrPrBefore(BigInteger nnimoshrPrBefore) {
        this.nnimoshrPrBefore = nnimoshrPrBefore;
    }

    public BigInteger getLastBikbakhshodBefore() {
        return lastBikbakhshodBefore;
    }

    public void setLastBikbakhshodBefore(BigInteger lastBikbakhshodBefore) {
        this.lastBikbakhshodBefore = lastBikbakhshodBefore;
    }

    public BigInteger getJarimehBakhshodBefore() {
        return jarimehBakhshodBefore;
    }

    public void setJarimehBakhshodBefore(BigInteger jarimehBakhshodBefore) {
        this.jarimehBakhshodBefore = jarimehBakhshodBefore;
    }

    public BigInteger getLastBakhshodeBefore() {
        return lastBakhshodeBefore;
    }

    public void setLastBakhshodeBefore(BigInteger lastBakhshodeBefore) {
        this.lastBakhshodeBefore = lastBakhshodeBefore;
    }

    public BigInteger getNimoshrPrBefore() {
        return nimoshrPrBefore;
    }

    public void setNimoshrPrBefore(BigInteger nimoshrPrBefore) {
        this.nimoshrPrBefore = nimoshrPrBefore;
    }

    public BigInteger getNdarkhastBakhshodehAfter() {
        return ndarkhastBakhshodehAfter;
    }

    public void setNdarkhastBakhshodehAfter(BigInteger ndarkhastBakhshodehAfter) {
        this.ndarkhastBakhshodehAfter = ndarkhastBakhshodehAfter;
    }

    public BigInteger getNdarkhastBakhshodehBefore() {
        return ndarkhastBakhshodehBefore;
    }

    public void setNdarkhastBakhshodehBefore(BigInteger ndarkhastBakhshodehBefore) {
        this.ndarkhastBakhshodehBefore = ndarkhastBakhshodehBefore;
    }

    public BigInteger getKmostj17N() {
        return kmostj17N;
    }

    public void setKmostj17N(BigInteger kmostj17N) {
        this.kmostj17N = kmostj17N;
    }

    public BigInteger getBmostj17N() {
        return bmostj17N;
    }

    public void setBmostj17N(BigInteger bmostj17N) {
        this.bmostj17N = bmostj17N;
    }

    public BigInteger getMos53() {
        return mos53;
    }

    public void setMos53(BigInteger mos53) {
        this.mos53 = mos53;
    }

    public BigInteger getNMos53() {
        return nMos53;
    }

    public void setNMos53(BigInteger nMos53) {
        this.nMos53 = nMos53;
    }

    public BigInteger getBimk461() {
        return bimk461;
    }

    public void setBimk461(BigInteger bimk461) {
        this.bimk461 = bimk461;
    }

    public BigInteger getBim461() {
        return bim461;
    }

    public void setBim461(BigInteger bim461) {
        this.bim461 = bim461;
    }

    public BigInteger getMos461() {
        return mos461;
    }

    public void setMos461(BigInteger mos461) {
        this.mos461 = mos461;
    }

    public BigInteger getNMos461() {
        return nMos461;
    }

    public void setNMos461(BigInteger nMos461) {
        this.nMos461 = nMos461;
    }

    public BigInteger getBimk462() {
        return bimk462;
    }

    public void setBimk462(BigInteger bimk462) {
        this.bimk462 = bimk462;
    }

    public BigInteger getBim462() {
        return bim462;
    }

    public void setBim462(BigInteger bim462) {
        this.bim462 = bim462;
    }

    public BigInteger getMos462() {
        return mos462;
    }

    public void setMos462(BigInteger mos462) {
        this.mos462 = mos462;
    }

    public BigInteger getNMos462() {
        return nMos462;
    }

    public void setNMos462(BigInteger nMos462) {
        this.nMos462 = nMos462;
    }

    public BigInteger getFani677() {
        return fani677;
    }

    public void setFani677(BigInteger fani677) {
        this.fani677 = fani677;
    }

    public BigInteger getEkh27() {
        return ekh27;
    }

    public void setEkh27(BigInteger ekh27) {
        this.ekh27 = ekh27;
    }

    public BigInteger getNHardAmt495() {
        return nHardAmt495;
    }

    public void setNHardAmt495(BigInteger nHardAmt495) {
        this.nHardAmt495 = nHardAmt495;
    }

    public BigInteger getNHardMost495() {
        return nHardMost495;
    }

    public void setNHardMost495(BigInteger nHardMost495) {
        this.nHardMost495 = nHardMost495;
    }

    public BigInteger getNFani677() {
        return nFani677;
    }

    public void setNFani677(BigInteger nFani677) {
        this.nFani677 = nFani677;
    }

    public BigInteger getNEkh27() {
        return nEkh27;
    }

    public void setNEkh27(BigInteger nEkh27) {
        this.nEkh27 = nEkh27;
    }

    public BigInteger getKsayad1() {
        return ksayad1;
    }

    public void setKsayad1(BigInteger ksayad1) {
        this.ksayad1 = ksayad1;
    }

    public BigInteger getNsayad1() {
        return nsayad1;
    }

    public void setNsayad1(BigInteger nsayad1) {
        this.nsayad1 = nsayad1;
    }

    public BigInteger getKgovsayad1() {
        return kgovsayad1;
    }

    public void setKgovsayad1(BigInteger kgovsayad1) {
        this.kgovsayad1 = kgovsayad1;
    }

    public BigInteger getGovsayad1() {
        return govsayad1;
    }

    public void setGovsayad1(BigInteger govsayad1) {
        this.govsayad1 = govsayad1;
    }

    public BigInteger getMhlpmoshavegh() {
        return mhlpmoshavegh;
    }

    public void setMhlpmoshavegh(BigInteger mhlpmoshavegh) {
        this.mhlpmoshavegh = mhlpmoshavegh;
    }

    public BigInteger getMkarmoshavegh() {
        return mkarmoshavegh;
    }

    public void setMkarmoshavegh(BigInteger mkarmoshavegh) {
        this.mkarmoshavegh = mkarmoshavegh;
    }

    public BigInteger getMbimmoshavegh() {
        return mbimmoshavegh;
    }

    public void setMbimmoshavegh(BigInteger mbimmoshavegh) {
        this.mbimmoshavegh = mbimmoshavegh;
    }

    public String getERS_DAT() {
        return ERS_DAT;
    }

    public void setERS_DAT(String ERS_DAT) {
        this.ERS_DAT = ERS_DAT;
    }

    public Long getSum4() {
        return sum4;
    }

    public void setSum4(Long sum4) {
        this.sum4 = sum4;
    }

    public Long getSum5() {
        return sum5;
    }

    public void setSum5(Long sum5) {
        this.sum5 = sum5;
    }

    public Long getSum6() {
        return sum6;
    }

    public void setSum6(Long sum6) {
        this.sum6 = sum6;
    }

    public Long getSum7() {
        return sum7;
    }

    public void setSum7(Long sum7) {
        this.sum7 = sum7;
    }

    public Long getSum8() {
        return sum8;
    }

    public void setSum8(Long sum8) {
        this.sum8 = sum8;
    }

    public Long getSum9() {
        return sum9;
    }

    public void setSum9(Long sum9) {
        this.sum9 = sum9;
    }

}
