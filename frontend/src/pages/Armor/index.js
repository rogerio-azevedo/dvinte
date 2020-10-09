import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Select } from 'antd'

import Button from '~/components/Button'
import { FaPlusCircle } from 'react-icons/fa'
import ModalArmorCreate from '~/components/Modals/ModalArmorCreate'

import api from '~/services/api'

import * as Styles from './styles'

const defaultValues = {
  Select: '',
  switch: false,
}

const { Option } = Select

export default function Armor() {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues })
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [showform, setShowform] = useState('hide')

  useEffect(() => {
    async function loadData() {
      setLoading(true)

      const response = await api.get('armors')

      setList(response.data)
      setLoading(false)
    }

    loadData()
  }, [])

  const onSubmit = data => {
    async function saveData() {
      setLoading(true)

      const weapons = await api.post('armors', data)

      const newList = [weapons.data, ...list]

      setList(newList)
      setLoading(false)

      reset(defaultValues)
      setShowform('hide')
    }
    saveData()
  }

  const columns = [
    {
      title: 'Cod',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      render: (text, item) => item.name.toUpperCase(),
    },
    {
      title: 'Bônus',
      dataIndex: 'bonus',
      render: (text, item) => `${item.bonus} CA`,
    },
    {
      title: 'Dex Maxima',
      dataIndex: 'dexterity',
      render: (text, item) => `${item.dexterity}`,
    },
    {
      title: 'Penalidade',
      dataIndex: 'penalty',
      render: (text, item) => `${item.penalty}`,
    },
    {
      title: 'Magia',
      dataIndex: 'magic',
      render: (text, item) => `${item.magic}%`,
    },
    {
      title: 'Desloc(P)',
      dataIndex: 'displacement_s',
      render: (text, item) => `${item.displacement_s} m`,
    },
    {
      title: 'Desloc(M)',
      dataIndex: 'displacement_m',
      render: (text, item) => `${item.displacement_m} m`,
    },
    {
      title: 'Peso',
      dataIndex: 'weight',
      render: (text, item) => `${item.weight} kg`,
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      render: (text, item) => `${item.price} PO`,
    },
    {
      title: 'Livro',
      dataIndex: 'book',
      render: (text, item) => `${item.book}`,
    },
    {
      title: 'Versão',
      dataIndex: 'version',
      render: (text, item) => `${item.version}`,
    },
    {
      title: 'Comprar',
      dataIndex: 'buy',
      render: (text, item) => <ModalArmorCreate armor={item} />,
    },
  ]

  function handleAdd() {
    setShowform('show')
  }

  return (
    <Styles.Container>
      <Styles.ContentContainer>
        <Styles.HeaderContainer>
          <h1>Cadastro de Armaduras e Escudos</h1>

          <FaPlusCircle
            color="#8e0e00"
            size={40}
            onClick={handleAdd}
            cursor={'pointer'}
          />
        </Styles.HeaderContainer>

        <Styles.FormContainer showform={showform}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Tipo</label>
                <section>
                  <Controller
                    as={
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Escolha o Tipo"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={1}>ARMADURA</Option>
                        <Option value={2}>ESCUDO</Option>
                        <Option value={3}>NATURAL</Option>
                        <Option value={4}>DEFLEXÃO</Option>
                        <Option value={5}>OUTRO</Option>
                      </Select>
                    }
                    name="type"
                    control={control}
                  />
                </section>
              </div>
              <div>
                <label htmlFor="character">Nome</label>
                <Styles.InputLarge
                  name="name"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Bonus</label>
                <Styles.InputMed
                  name="bonus"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Dex Maxima</label>
                <Styles.InputMed
                  name="dexterity"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Penalidade</label>
                <Styles.InputMed
                  name="penalty"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Magia</label>
                <Styles.InputMed
                  name="magic"
                  ref={register({ required: true })}
                />
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Desloc (P)</label>
                <Styles.InputMed
                  name="displacement_s"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Desloc (M)</label>
                <Styles.InputMed
                  name="displacement_m"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Peso</label>
                <Styles.InputMed
                  name="weight"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Preço</label>
                <Styles.InputMed
                  name="price"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Livro</label>
                <Styles.InputLarge
                  name="book"
                  ref={register({ required: true })}
                />
              </div>

              <div>
                <label htmlFor="character">Versão</label>
                <section>
                  <Controller
                    as={
                      <Select
                        showSearch
                        style={{ width: 180 }}
                        placeholder="Escolha a Versão"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="V 1.0e">V 1.0e</Option>
                        <Option value="V 2.0e">V 2.0e</Option>
                        <Option value="V 3.0e">V 3.0e</Option>
                        <Option value="V 3.5e">V 3.5e</Option>
                        <Option value="V 4.0e">V 4.0e</Option>
                        <Option value="V 5.0e">V 5.0e</Option>
                      </Select>
                    }
                    name="version"
                    control={control}
                  />
                </section>
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer loading={loading ? 1 : 0}>
              <Button type="submit" TextButton="Gravar" />
            </Styles.InputContainer>
          </form>
          <Styles.TableContainer>
            <Styles.MyTable
              rowKey="id"
              dataSource={list}
              columns={columns}
              pagination={{ pageSize: 25 }}
            />
          </Styles.TableContainer>
        </Styles.FormContainer>
      </Styles.ContentContainer>
    </Styles.Container>
  )
}
