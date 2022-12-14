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
import org.eclipse.persistence.mappings.ManyToManyMapping;

/**
 *
 * @author e_shoghi
 */
public class LetterOrderPayDC implements DescriptorCustomizer {

    @Override
    public void customize(ClassDescriptor descriptor) throws Exception {
        ManyToManyMapping manyToManyMapping = (ManyToManyMapping) descriptor.getMappingForAttributeName("orderPays");
        ExpressionBuilder builder = new ExpressionBuilder();
        Expression addedExpression = builder.getField("CLM_ORDPAY.ORP_STAT").notEqual("1");
        manyToManyMapping.setSelectionCriteria(addedExpression);
    }
}
