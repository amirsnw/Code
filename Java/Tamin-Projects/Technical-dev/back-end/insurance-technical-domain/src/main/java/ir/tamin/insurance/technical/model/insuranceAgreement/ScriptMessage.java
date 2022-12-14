package ir.tamin.insurance.technical.model.insuranceAgreement;

import java.io.Serializable;

public class ScriptMessage implements Serializable {

    private String elseScript;
    private String ifScript;
    private String thenScript;
    private String procedureScript;
    private String functionScript;

    public ScriptMessage(String elseScript, String ifScript, String thenScript, String procedureScript, String functionScript) {
        this.elseScript = elseScript;
        this.ifScript = ifScript;
        this.thenScript = thenScript;
        this.procedureScript = procedureScript;
        this.functionScript = functionScript;
    }

    public ScriptMessage() {
    }

    public String getElseScript() {
        return elseScript;
    }

    public void setElseScript(String elseScript) {
        this.elseScript = elseScript;
    }

    public String getIfScript() {
        return ifScript;
    }

    public void setIfScript(String ifScript) {
        this.ifScript = ifScript;
    }

    public String getThenScript() {
        return thenScript;
    }

    public void setThenScript(String thenScript) {
        this.thenScript = thenScript;
    }

    public String getProcedureScript() {
        return procedureScript;
    }

    public void setProcedureScript(String procedureScript) {
        this.procedureScript = procedureScript;
    }

    public String getFunctionScript() {
        return functionScript;
    }

    public void setFunctionScript(String functionScript) {
        this.functionScript = functionScript;
    }
}
