import { Col, Layout, Row, Select, Button, Modal } from 'antd';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import styles from './style.module.scss';

import 'antd/dist/antd.css';

const { Option } = Select;

type Usuario = {
  id: number;
  nome: string;
  sexo: string;
};

export default function NovaPartida() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario1, setUsuario1] = useState<Usuario>();
  const [usuario2, setUsuario2] = useState<Usuario>();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const buscarUsuarios = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/usuarios`);
      setUsuarios(response.data);
      console.log(usuarios);

      //   setLoading(false);
    } catch (error) {
      console.log('erro ao buscar usuarios');
      //   onNotification("error", {
      // 	message:
      // 	  "Erro! Provavelmente ouve uma falha na comunicação com o servido, tente novamente",
      // 	description:
      // 	  "Se persistir o erro, verifique a senha na lista de SENHAS NÃO ATENDIDAS",
      //   });
      //   setLoading(false);
    }
  }, []);

  const selecionarUser1 = (item: any) => {
    setUsuario1(item);
    console.log('Jogador 1: ' + item);
  };
  const selecionarUser2 = (item: any) => {
    setUsuario2(item);

    console.log('Jogador 2: ' + item);
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div className={styles.bodyPartida}>
      <Layout>
        <Head>
          <title>Nova Partida | Selecionar Jogador </title>
        </Head>
        <main className={styles.bodyContainer}>
          <section>
            <div className={styles.container}>
              <h1>Disputa</h1>
              {/* <div > */}
              <Row className={styles.boxName}>
                <Col
                  className={styles.jogador1}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                >
                  <label className={styles.label1} htmlFor="jodador">
                    Jogador 1
                  </label>
                  <br />
                  <Select
                    className={styles.selectPlayer}
                    showSearch
                    placeholder="Jogador 1"
                    onSelect={(e: any) => {
                      selecionarUser1(e);
                    }}
                  >
                    {usuarios.map((item) => (
                      <Option key={item.id} value={item.nome}>
                        {item.nome}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col
                  className={styles.jogador2}
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                >
                  <label className={styles.label2} htmlFor="jodador">
                    Jogador 2
                  </label>
                  <br />
                  <Select
                    className={styles.selectPlayer}
                    showSearch
                    placeholder="Jogador 2"
                    onSelect={(e: any) => {
                      selecionarUser2(e);
                    }}
                  >
                    {usuarios.map((item) => (
                      <Option key={item.id} value={item.nome}>
                        {item.nome}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <br />
              <div className={styles.boxName}>
                <span>
                  <>
                    <>{usuario1}</>
                  </>
                </span>
                <span>
                  <>
                    <>{usuario2}</>
                  </>
                </span>
              </div>
              <h1>
                <img
                  className={styles.pipoca}
                  src="/images/pipoca.webp"
                  alt="pipoca"
                />
              </h1>

              <h1>
                <Button
                  type="primary"
                  onClick={showModal}
                  className={styles.buttonStart}
                >
                  Start
                </Button>
                <Modal
                  title="Title"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
              </h1>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
