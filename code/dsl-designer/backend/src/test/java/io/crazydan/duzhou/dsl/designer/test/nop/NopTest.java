/*
 * 渡舟平台 - 致力于构建自运维、自监控、可演化的全功能型应用平台
 * Copyright (C) 2024 Crazydan Studio <https://studio.crazydan.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.
 * If not, see <https://www.gnu.org/licenses/lgpl-3.0.en.html#license-text>.
 */

package io.crazydan.duzhou.dsl.designer.test.nop;

import io.nop.api.core.config.AppConfig;
import io.nop.core.initialize.CoreInitialization;
import io.nop.core.lang.json.JsonTool;
import io.nop.ioc.initialize.IocCoreInitializer;
import io.nop.xlang.xdef.IXDefinition;
import io.nop.xlang.xmeta.IObjMeta;
import io.nop.xlang.xmeta.SchemaLoader;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.nop.core.CoreConfigs.CFG_JSON_PARSE_IGNORE_UNKNOWN_PROP;

/**
 * @author <a href="mailto:dengjun_tj@dhcc.com.cn">dengjun</a>
 * @date 2024-01-11
 */
public class NopTest {
    protected final Logger log = LoggerFactory.getLogger(getClass());

    @BeforeAll
    public static void init() {
        AppConfig.getConfigProvider().updateConfigValue(CFG_JSON_PARSE_IGNORE_UNKNOWN_PROP, true);

        // 不初始化 Ioc
        CoreInitialization.initializeTo(new IocCoreInitializer().order() - 1);
    }

    @AfterAll
    public static void destroy() {
        CoreInitialization.destroy();
    }

    @Test
    public void test_Parse_XDef() {
        IXDefinition xdef = SchemaLoader.loadXDefinition("/nop/schema/orm/orm.xdef");

        // 输出 DSL 定义结构的 json 形式
        String json = JsonTool.serialize(xdef.toNode(), true);
        log.info(json);

        IObjMeta xmeta = SchemaLoader.loadXMeta("/nop/schema/orm/orm.xdef");
        json = JsonTool.serialize(xmeta.toNode(), true);
        log.info(json);
    }
}
