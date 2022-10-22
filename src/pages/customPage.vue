<template>
    <div class="custom">
        <h2 style="margin-bottom: 30px;">
            <span>自定义模式</span>
            <a-button style="float: right;" @click="router.go(-1)">返回
            </a-button>
        </h2>
        <a-form :model="config" label-align="left" :label-col="{span:12}" @finish="handleFinish" ref="formRef">
            <a-row>
                <a-col :span="11">
                    <a-form-item label="槽容量" name="slotNum">
                        <a-input-number v-model:value="config.slotNum" />
                    </a-form-item>
                </a-col>
                <a-col :span="11" :offset="1">
                    <a-form-item label="合成数" name="composeNum">
                        <a-input-number v-model:value="config.composeNum" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="11">
                    <a-form-item label="图案个数" name="graphicNum">
                        <a-input-number v-model:value="config.graphicNum" />
                    </a-form-item>
                </a-col>
                <a-col :span="11" :offset="1">
                    <a-form-item label="边界收缩步长" name="borderStep">
                        <a-input-number v-model:value="config.borderStep" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="11">
                    <a-form-item label="每层块数" name="levelBlockNum">
                        <a-input-number v-model:value="config.levelBlockNum" />
                    </a-form-item>
                </a-col>
                <a-col :span="11" :offset="1">
                    <a-form-item label="总层数" name="levelNum">
                        <a-input-number v-model:value="config. levelNum" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row>
                <a-col :span="11">
                    <a-form-item label="随机区数" name="randomAreaNum">
                        <a-input-number v-model:value="config.randomAreaNum" />
                    </a-form-item>
                </a-col>
                <a-col :span="11" :offset="1">
                    <a-form-item label="随机区块数" name="randomBlockNum">
                        <a-input-number v-model:value="config.randomBlockNum" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item label="图案列表" name="graphicsStr" :label-col="{ span: 4}">
                <a-input v-model:value="config.graphicsStr" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" style="margin-bottom: 12px;" block>
                    开始
                </a-button>
                <a-button style="margin-bottom: 12px;" block @click="resetForm">
                    重置
                </a-button>
                <a-button danger block @click="resetConfig">
                    初始化配置
                </a-button>
            </a-form-item>
        </a-form>
    </div>

</template>

<script setup lang="ts">
import { defaultGameConfig } from "@/core/gameConfig";
import { useglobalStore } from "@/store";
import { reactive, ref } from "@vue/reactivity";
import { FormInstance } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 表单对象
const formRef = ref<FormInstance>();

const { customConfig, setGameConfig, setCustomConfig, reset } = useglobalStore()
const initConfig = {
    randomAreaNum: 2,
    randomBlockNum: 8,
    graphicsStr: defaultGameConfig.graphics.join(''),
    ...customConfig
}
const config = reactive<any>(initConfig)

/**
 * 表单提交
 * @param value 
 */
const handleFinish = (value: any) => {
    config.randomBlocks = new Array(config.randomAreaNum).fill(config.randomBlockNum);
    if (value.graphicsStr) {
        config.graphics = Array.from(value.graphicsStr);
    }
    console.log(config);
    
    // 保存配置
    setGameConfig(config);
    setCustomConfig(config);
    router.push('/game');
}
/**
 * 重置
 */
const resetForm = () => {
  formRef?.value?.resetFields();
};

/**
 * 初始化配置
 */
const resetConfig = () => {
    reset();
    router.go(0);
}

</script>

<style>
.ant-form-item-label>label {
    color: #fff !important;

}
</style>>
