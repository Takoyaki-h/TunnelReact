import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Card, theme, Input, Result, Empty,Spin,message,  Upload,Tabs,Tooltip} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {useState} from 'react'
import {ModelTest} from "@/services/ant-design-pro/api";
import ModelResult from "@/components/Charts/ModelResult";
import {BulbOutlined,BarChartOutlined,FileTextOutlined,EditOutlined} from '@ant-design/icons';
const { TextArea } = Input;
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const InfoCard: React.FC<{
  title: string;
  result:any;
  loading:boolean,
}> = ({ title,result,loading }) =>
{
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
           <BulbOutlined />{title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'center',
          lineHeight: '100px',
          marginBottom: 8,
          minHeight:'60px'
        }}
      >

        <Spin spinning={loading} size={"large"}>
          {
            result===""?<Empty/>:result==="正常数据"?<Result
    status="success"
    title={result}
    subTitle={"模型预测结果为正常数据。"}
  />:<Result
    title={result}
    subTitle={"模型预测结果为"+result+"。"}

  />
          }
        </Spin>



      </div>
    </div>
  );
};
const InfoCard1: React.FC<{
  title: string;
  result:any;
  data:any;
  loading:boolean
}> = ({ title  ,result,data,loading}) =>
{
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
         <BarChartOutlined />{title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        <Spin spinning={loading} size={"large"}>
                  {result===""?<Empty/>:<ModelResult data={data}/>}

        </Spin>


      </div>
    </div>
  );
};
const { Dragger } = Upload;


const BearingFault: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      const modelResult = await ModelTest( data );
      if (modelResult) {
        message.success("请求成功！")
        setLoading(false)
        setResult(modelResult.result)
        console.log("modelResult.data=",modelResult.data)
        setData(modelResult.data)

      }
    } catch (error) {
      setLoading(false)
      console.log("#######model error######",error);
    }
  };
  const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    console.log("------info----:",info.file)
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} 文件上传成功！`);
      const reader = new FileReader();
      reader.readAsText( info.file.originFileObj ? info.file.originFileObj : info.file);
      reader.onload = () => {
        // 获取文件内容存进tempFile
        // this.setState({ tempFile: reader.result});
        handleSubmit(reader.result);
        console.log("test=",reader.result)

      };


    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败！`);
    }
  },
   beforeUpload: (file) => {
      console.log(file)

      },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
  const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <Tooltip title="通过上传本地振动信号数据文件进行故障诊断">
    <span>
            <FileTextOutlined />
            文件上传
          </span>
  </Tooltip>,
    children: <div>
          <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
    <p className="ant-upload-hint">
      支持单次或批量上传
    </p>
  </Dragger>
        </div>
  },
  {
    key: '2',
    label: <Tooltip title="通过直接在页面输入振动信号进行故障诊断">
    <span>
            <EditOutlined />
            数据输入
          </span>
  </Tooltip>,
    children: <div>
      {/*<div*/}
      {/*      style={{*/}
      {/*        fontSize: '20px',*/}
      {/*        color: token.colorTextHeading,*/}
      {/*        lineHeight:'50px'*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      请输入振动信号：*/}
      {/*    </div>*/}
      {/*    <TextArea onPressEnter={async (e)=>{*/}
      {/*      await handleSubmit(e.target.value);*/}

      {/*    }} autoSize={{ minRows: 3, maxRows: 5 }} placeholder="请输入振动信号"/>*/}
       <TextArea rows={8} placeholder="请输入振动信号" onPressEnter={async (e)=>{
            await handleSubmit(e.target.value);

          }} />
    </div>
,
  }
];


  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
        >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

           <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              marginTop:"10px"
            }}
          >
            <InfoCard
              title=" 预测结果"
             result={result}
              loading={loading}



            />
            <InfoCard1
              title=" 模型预测概率"
              result={result}
              data={data}
              loading={loading}

            />
          </div>
        </div>

      </Card>
    </PageContainer>
  );
};

export default BearingFault;
