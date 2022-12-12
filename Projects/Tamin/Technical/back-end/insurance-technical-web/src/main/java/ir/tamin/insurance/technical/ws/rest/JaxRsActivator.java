/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ir.tamin.insurance.technical.ws.rest;

import ir.tamin.framework.ws.rest.GeneralJaxRsActivator;
import ir.tamin.framework.ws.rest.filter.ArabicLetterInterceptor;
import ir.tamin.framework.ws.rest.security.jwt.JwtDynamicFeatureV2;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import javax.ws.rs.ApplicationPath;

    @ApplicationPath("/api")
    public class JaxRsActivator extends GeneralJaxRsActivator {

        public JaxRsActivator() {
            this.register(RolesAllowedDynamicFeature.class);
            packages("ir.tamin.insurance.technical.ws.rest");
//  packages("ir.tamin.insurance.technical.ws.rest", "ir.tamin.framework.ws.rest", "com.fasterxml.jackson");
            this.register(JwtDynamicFeatureV2.class);
            //    this.register(WadlFeature.class);
            this.register(ArabicLetterInterceptor.class);
        }
        

        }

