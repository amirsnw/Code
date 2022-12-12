<?xml version="1.0" encoding="utf-8"?>
<wsdl:definitions xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:s="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="http://tempuri.org/SSupPermit/SsupServices" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" targetNamespace="http://tempuri.org/SSupPermit/SsupServices" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
  <wsdl:types>
    <s:schema elementFormDefault="qualified" targetNamespace="http://tempuri.org/SSupPermit/SsupServices">
      <s:element name="GetSsupPermit">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="sToday" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sBrchCode" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="GetSsupPermitResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="GetSsupPermitResult" type="tns:ArrayOfClsPermitSpec" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="ArrayOfClsPermitSpec">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="unbounded" name="clsPermitSpec" nillable="true" type="tns:clsPermitSpec" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="clsPermitSpec">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="1" name="CREATEDT" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="CREATEUID" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ISU_REFRENCEDID" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="LETTER_DATE" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="LETTER_NO" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PERMITDATE" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PERMITSERIALNO" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PERMITTYPECODE" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PERMITVALUE" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PERMIT_EDATE" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="PERMIT_SDATE" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="RISUID" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="RWSHID" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:element name="SetPermit_ReciveState">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="sToday" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sBrchCode" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="SetPermit_ReciveStateResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="SetPermit_ReciveStateResult" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="GetEnt_PayStatus_Ist">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="sRisuid" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sFundCode" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sBrchCode" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:complexType name="clsEnt_PayStatus_Ist">
        <s:sequence>
          <s:element minOccurs="1" maxOccurs="1" name="dtn_amount" type="s:int" />
          <s:element minOccurs="0" maxOccurs="1" name="new_paydate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="entreqno" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="entreqdate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ist_reqdate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="debitsubcode" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ord_ordno" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="ord_docdat" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="dtn_expdat" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="paydate" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="cws_dbtno" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="outpay" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="unpay" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="inpay" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="new_outpay" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="new_nopay" type="s:string" />
          <s:element minOccurs="0" maxOccurs="1" name="rec_type" type="s:string" />
        </s:sequence>
      </s:complexType>
      <s:complexType name="ArrayOfClsEnt_PayStatus_Ist">
        <s:sequence>
          <s:element minOccurs="0" maxOccurs="unbounded" name="clsEnt_PayStatus_Ist" nillable="true" type="tns:clsEnt_PayStatus_Ist" />
        </s:sequence>
      </s:complexType>
      <s:element name="GetEnt_PayStatus_IstResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="GetEnt_PayStatus_IstResult" type="tns:ArrayOfClsEnt_PayStatus_Ist" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="GetEnt_PayStatus_Fund">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="sRisuid" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sFundCode" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sBrchCode" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="GetEnt_PayStatus_FundResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="GetEnt_PayStatus_FundResult" type="tns:ArrayOfClsEnt_PayStatus_Ist" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="GetEnt_PayStatus_Cash">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="sRisuid" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sFundCode" type="s:string" />
            <s:element minOccurs="0" maxOccurs="1" name="sBrchCode" type="s:string" />
          </s:sequence>
        </s:complexType>
      </s:element>
      <s:element name="GetEnt_PayStatus_CashResponse">
        <s:complexType>
          <s:sequence>
            <s:element minOccurs="0" maxOccurs="1" name="GetEnt_PayStatus_CashResult" type="tns:ArrayOfClsEnt_PayStatus_Ist" />
          </s:sequence>
        </s:complexType>
      </s:element>
    </s:schema>
  </wsdl:types>
  <wsdl:message name="GetSsupPermitSoapIn">
    <wsdl:part name="parameters" element="tns:GetSsupPermit" />
  </wsdl:message>
  <wsdl:message name="GetSsupPermitSoapOut">
    <wsdl:part name="parameters" element="tns:GetSsupPermitResponse" />
  </wsdl:message>
  <wsdl:message name="SetPermit_ReciveStateSoapIn">
    <wsdl:part name="parameters" element="tns:SetPermit_ReciveState" />
  </wsdl:message>
  <wsdl:message name="SetPermit_ReciveStateSoapOut">
    <wsdl:part name="parameters" element="tns:SetPermit_ReciveStateResponse" />
  </wsdl:message>
  <wsdl:message name="GetEnt_PayStatus_IstSoapIn">
    <wsdl:part name="parameters" element="tns:GetEnt_PayStatus_Ist" />
  </wsdl:message>
  <wsdl:message name="GetEnt_PayStatus_IstSoapOut">
    <wsdl:part name="parameters" element="tns:GetEnt_PayStatus_IstResponse" />
  </wsdl:message>
  <wsdl:message name="GetEnt_PayStatus_FundSoapIn">
    <wsdl:part name="parameters" element="tns:GetEnt_PayStatus_Fund" />
  </wsdl:message>
  <wsdl:message name="GetEnt_PayStatus_FundSoapOut">
    <wsdl:part name="parameters" element="tns:GetEnt_PayStatus_FundResponse" />
  </wsdl:message>
  <wsdl:message name="GetEnt_PayStatus_CashSoapIn">
    <wsdl:part name="parameters" element="tns:GetEnt_PayStatus_Cash" />
  </wsdl:message>
  <wsdl:message name="GetEnt_PayStatus_CashSoapOut">
    <wsdl:part name="parameters" element="tns:GetEnt_PayStatus_CashResponse" />
  </wsdl:message>
  <wsdl:portType name="SsupServicesSoap">
    <wsdl:operation name="GetSsupPermit">
      <wsdl:input message="tns:GetSsupPermitSoapIn" />
      <wsdl:output message="tns:GetSsupPermitSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="SetPermit_ReciveState">
      <wsdl:input message="tns:SetPermit_ReciveStateSoapIn" />
      <wsdl:output message="tns:SetPermit_ReciveStateSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="GetEnt_PayStatus_Ist">
      <wsdl:input message="tns:GetEnt_PayStatus_IstSoapIn" />
      <wsdl:output message="tns:GetEnt_PayStatus_IstSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="GetEnt_PayStatus_Fund">
      <wsdl:input message="tns:GetEnt_PayStatus_FundSoapIn" />
      <wsdl:output message="tns:GetEnt_PayStatus_FundSoapOut" />
    </wsdl:operation>
    <wsdl:operation name="GetEnt_PayStatus_Cash">
      <wsdl:input message="tns:GetEnt_PayStatus_CashSoapIn" />
      <wsdl:output message="tns:GetEnt_PayStatus_CashSoapOut" />
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:binding name="SsupServicesSoap" type="tns:SsupServicesSoap">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="document" />
    <wsdl:operation name="GetSsupPermit">
      <soap:operation soapAction="http://tempuri.org/SSupPermit/SsupServices/GetSsupPermit" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="SetPermit_ReciveState">
      <soap:operation soapAction="http://tempuri.org/SSupPermit/SsupServices/SetPermit_ReciveState" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="GetEnt_PayStatus_Ist">
      <soap:operation soapAction="http://tempuri.org/SSupPermit/SsupServices/GetEnt_PayStatus_Ist" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="GetEnt_PayStatus_Fund">
      <soap:operation soapAction="http://tempuri.org/SSupPermit/SsupServices/GetEnt_PayStatus_Fund" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="GetEnt_PayStatus_Cash">
      <soap:operation soapAction="http://tempuri.org/SSupPermit/SsupServices/GetEnt_PayStatus_Cash" style="document" />
      <wsdl:input>
        <soap:body use="literal" />
      </wsdl:input>
      <wsdl:output>
        <soap:body use="literal" />
      </wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:service name="SsupServices">
    <documentation xmlns="http://schemas.xmlsoap.org/wsdl/" />
    <wsdl:port name="SsupServicesSoap" binding="tns:SsupServicesSoap">
      <soap:address location="http://ssuppermits.tamin.ir:4040/ssuppermits/SsupPermitsMain.asmx" />
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>