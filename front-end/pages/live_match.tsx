import { Table, Tag, Space, Button, Avatar } from 'antd';
import axios from 'axios';
import { useEffect, useState } from "react";
// import {Date} from 
import { MyProvider, useMyContext } from "./ContextProvider";


export default function MatchLive() {
    const [datas, setData] = useState([]);
    let context: any = useMyContext();

    const columns = [
        {
            title: 'Player One',
            dataIndex: 'User1',
            key: '1',
            render: (res) =>
                <Space>
                    <Avatar src={res[1]} />
                    <span>{res[0]}</span>
                </Space>,
        },
        {
            title: 'Player Two',
            dataIndex: 'User2',
            key: '2',
            render: (res) =>
                <Space>
                    <Avatar src={res[1]} />
                    <span>{res[0]}</span>
                </Space>,
        },
        {
            title: 'Time',
            key: '3',
            dataIndex: 'Time',
            render: Date => {
                return Date;
            }
        },
        {
            title: 'Action',
            key: '4',
            render: (rese) => (
                <Space>
                    <Button type="primary" onClick={() => {
                        // console.log(rese.key);
                        axios.get("http://10.12.5.14:3000/game/watch/" + rese.key).then(res => {
                            console.log(res.data);
                            context.setShowCanvas
                            (
                                {
                                    show: true,
                                    gameInfo: res.data
                                }
                            );
                        });
                        // contexts.setShowCanvas(true);
                        // console.log(res);
                    }
                    }>
                        Watch
                    </Button>
                </Space>
            ),
        },
    ];
    const ISSERVER = typeof window === "undefined";

    // const [Datasource, setDatasource] = useState([]);
    const fet = async () => {
        await axios.get("http://10.12.5.14:3000/game/current/")
            .then(res => {
                if (datas['id'] === undefined) {
                    setData(res.data);
                }
            });
    }

    useEffect(() => {
        if (datas.length === 0 && !ISSERVER)
            fet();
    }, [datas]);
    return (
        <div>
            {
                <Table loading={!datas.length} columns={columns} dataSource={datas} pagination={{ pageSize: 7 }} />
            }
        </div>
    );
}