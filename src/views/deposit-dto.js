class DepositDTO {
  constructor(deposit) {
    const { id, description, value } = deposit

    this.id = id
    this.description = description
    this.value = value
  }

  toJson() {
    return {
      id: this.id,
      description: this.description,
      value: this.value
    }
  }
}

export default DepositDTO
