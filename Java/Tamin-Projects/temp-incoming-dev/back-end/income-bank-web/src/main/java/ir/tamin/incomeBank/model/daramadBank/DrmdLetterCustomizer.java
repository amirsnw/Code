/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.model.daramadBank;

import org.eclipse.persistence.config.DescriptorCustomizer;
import org.eclipse.persistence.descriptors.ClassDescriptor;
import org.eclipse.persistence.expressions.Expression;
import org.eclipse.persistence.expressions.ExpressionBuilder;
import org.eclipse.persistence.mappings.ManyToOneMapping;

/**
 *
 * @author e_shoghi
 */
public class DrmdLetterCustomizer implements DescriptorCustomizer {

    public void customize(ClassDescriptor descriptor) throws Exception {
        ManyToOneMapping mapping = (ManyToOneMapping) descriptor
                .getMappingForAttributeName("sanad");

        ExpressionBuilder eb = new ExpressionBuilder(mapping
                .getReferenceClass());
        Expression fkExp = eb.getField("DRMDLSANAD.VCH_LSMDATE").equal(eb.getParameter("DRMD_LETTER.LETTER_DATE").substring(1, 6));
//		Expression activeExp = eb.get("active").equal(true);

//		mapping.setSelectionCriteria(fkExp.and(activeExp));
        mapping.setSelectionCriteria(fkExp);
        //////////////////////////////////////////////
//         descriptor.removeMappingForAttributeName("sanad");
//        ManyToOneMapping mapping = (ManyToOneMapping) descriptor.getMappingForAttributeName("sanad");
//        Expression origExp = mapping.buildSelectionCriteria();
//        ExpressionBuilder expBuilder = origExp.getBuilder();
//        
//        Expression fkExp = expBuilder.getField("DRMDLSANAD.VCH_LSMDATE").equal(expBuilder.getParameter("DRMD_LETTER.LETTER_DATE").substring(1, 6));
////        Expression newExp = origExp.and(fkExp);
//        mapping.setSelectionCriteria(fkExp);
////        descriptor.addMapping(mapping);
    }
}
