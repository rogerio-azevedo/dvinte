import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Select } from 'antd'
import { Switch } from '@material-ui/core'
import { Table } from 'antd'

import Button from '~/components/Button'
import { FaPlusCircle } from 'react-icons/fa'
import ModalWeaponCreate from '~/components/ModalWeaponCreate'

import api from '~/services/api'

import * as Styles from './styles'

const defaultValues = {
  Select: '',
  switch: false,
}

const { Option } = Select

export default function Weapon() {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues })
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [showform, setShowform] = useState('hide')

  useEffect(() => {
    async function loadData() {
      setLoading(true)

      const response = await api.get('weapons')

      setList(response.data)
      setLoading(false)
    }

    loadData()
  }, [])

  const onSubmit = data => {
    async function saveData() {
      setLoading(true)

      const weapons = await api.post('weapons', data)

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
      key: 'name',
    },
    {
      title: 'Dano (P)',
      dataIndex: 'name',
      render: (text, item) => `${item.multiplier_s}d${item.dice_s}`,
    },
    {
      title: 'Dano (M)',
      dataIndex: 'name',
      render: (text, item) => `${item.multiplier_m}d${item.dice_m}`,
    },
    {
      title: 'Crítico',
      dataIndex: 'critical',
      render: (text, item) => `${item.crit_from}-20/x${item.critical}`,
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      render: (text, item) => `${item.price} PO`,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Alcance',
      dataIndex: 'range',
      render: (text, item) => `${item.range} m`,
    },
    {
      title: 'Peso',
      dataIndex: 'weight',
      render: (text, item) => `${item.weight} kg`,
    },
    {
      title: 'Duas mãos',
      dataIndex: 'two_hand',
      render: (text, item) => (item.two_hand ? 'SIM' : 'NÃO'),
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
      render: (text, item) => <ModalWeaponCreate weapon={item} />,
    },
  ]

  function handleAdd() {
    setShowform('show')
  }

  return (
    <Styles.Container>
      <Styles.ContentContainer>
        <Styles.HeaderContainer>
          <h1>Cadastro de Armas</h1>

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
                <label htmlFor="character">Nome</label>
                <Styles.InputLarge
                  name="name"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Dano (dado) (P)</label>
                <Styles.InputMed
                  name="dice_s"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Qtde Dados (P)</label>
                <Styles.InputMed
                  name="multiplier_s"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Dano (dado) (M)</label>
                <Styles.InputMed
                  name="dice_m"
                  ref={register({ required: true })}
                />
              </div>

              <div>
                <label htmlFor="character">Qtde Dados (M)</label>
                <Styles.InputMed
                  name="multiplier_m"
                  ref={register({ required: true })}
                />
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Crítico Mínimo</label>
                <Styles.InputMed
                  name="crit_from"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Crítico Multiplicador</label>
                <Styles.InputMed
                  name="critical"
                  ref={register({ required: true })}
                />
              </div>
              <div>
                <label htmlFor="character">Alcance</label>
                <Styles.InputMed
                  name="range"
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
                        <Option value="CONCUSSÃO">CONCUSSÃO</Option>
                        <Option value="CORTANTE">CORTANTE</Option>
                        <Option value="PERFURANTE">PERFURANTE</Option>
                      </Select>
                    }
                    name="type"
                    control={control}
                  />
                </section>
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Material</label>
                <Styles.InputLarge
                  name="material"
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

              <div>
                <label htmlFor="character">Duas Mãos</label>
                <div>
                  <section>
                    <Controller
                      as={<Switch value="checkedA" />}
                      type="checkbox"
                      name="switch"
                      control={control}
                    />
                  </section>
                </div>
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer loading={loading ? 1 : 0}>
              <Button type="submit" TextButton="Gravar" />
            </Styles.InputContainer>
          </form>
          <Styles.TableContainer>
            <Table rowKey="id" dataSource={list} columns={columns} />
          </Styles.TableContainer>
        </Styles.FormContainer>
      </Styles.ContentContainer>
    </Styles.Container>
  )
}
