
const PlayerDetail = ({player}) => {
  return (
    <div>
      {player.firstName.default} {player.lastName.default}
    </div>
  )
}

export default PlayerDetail